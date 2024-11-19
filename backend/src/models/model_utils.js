import onnxruntime from 'onnxruntime-node'

const employ_session = await onnxruntime.InferenceSession.create('./src/models/employed_model.onnx')
const salary_session = await onnxruntime.InferenceSession.create('./src/models/salary_model.onnx')

export const createInputsEmployment = (value_object) => {
    const features = {
        inputs: [value_object.Accessibility],
        inputs_1: [value_object.Age],
        inputs_2: [value_object.ComputerSkills],
        inputs_3: [value_object.Country],
        inputs_4: [value_object.EdLevel],
        inputs_5: [value_object.Employment],
        inputs_6: [value_object.Gender],
        inputs_7: [value_object.MainBranch],
        inputs_8: [value_object.MentalHealth],
        inputs_9: [value_object.YearsCode],
        inputs_10: [value_object.YearsCodePro],
    };

    const inputs = Object.fromEntries(
        Object.entries(features).map(([name, value]) =>
            [name, typeof value[0] === 'string' ? new onnxruntime.Tensor('string', value, [1, 1]) : new onnxruntime.Tensor('float32', value, [1, 1])]
        )
    );

    return inputs
}


export const predictEmployment = async (inputs) => {
    const output = await employ_session.run(inputs);

    const prediction = output.output_0.data[0] > 0.5 ? 'Employ' : 'Do not employ';
    console.log('Employment prediction:', prediction, '(' + output.output_0.data[0] + ')');

    return prediction
}

export const createInputsSalary = (value_object) => {
    const features = {
        inputs: [value_object.Accessibility],
        inputs_1: [value_object.Age],
        inputs_2: [value_object.ComputerSkills],
        inputs_3: [value_object.Country],
        inputs_4: [value_object.EdLevel],
        inputs_5: [value_object.Employment],
        inputs_6: [value_object.Gender],
        inputs_7: [value_object.MainBranch],
        inputs_8: [value_object.MentalHealth],
        inputs_9: [value_object.YearsCode],
        inputs_10: [value_object.YearsCodePro],
    };

    const inputs = Object.fromEntries(
        Object.entries(features).map(([name, value]) =>
            [name, typeof value[0] === 'string' ? new onnxruntime.Tensor('string', value, [1, 1]) : new onnxruntime.Tensor('float32', value, [1, 1])]
        )
    );

    return inputs
}

export const predictSalary = async (inputs) => {
    const output = await salary_session.run(inputs);

    const target_mean = 74804.15255839535;
    const target_std = 54488.45860514869;

    output.output_0.data[0] = output.output_0.data[0] * target_std + target_mean;
    const prediction = Math.round(output.output_0.data[0]);

    console.log('Salary prediction:', prediction);

    return prediction
}