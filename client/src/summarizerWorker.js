/* eslint-disable no-restricted-globals */
import { env, pipeline } from '@xenova/transformers';

// set transformers env variables
env.allowLocalModels = false;
env.useBrowserCache = false;

class MySummaryPipeline {
    static task = 'summarization';
    static instance = null;
    static model = ''; // we can use a model from the Hugging Face model hub https://huggingface.co/models?pipeline_tag=summarization&library=transformers.js,onnx&sort=trending

    static async getInstance() {
        if (this.instance === null) {
            console.log('Loading pipeline');
            this.instance = await pipeline(this.task, this.model);
            console.log('Pipeline loaded');
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    console.log('Summarization event received');

    // Retrieve the translation pipeline. When called for the first time,
    // this will load the pipeline and save it for future use.
    let summarizer = await MySummaryPipeline.getInstance();

    // check if event.data is not empty
    if (event.data === '') {
        console.log('Empty data received');
        return;
    }

    // Actually perform the translation
    let output = await summarizer(event.data);
    console.log('Output:', output);

    // Send the output back to the main thread
    self.postMessage({
        status: 'complete',
        output: output,
    });
});