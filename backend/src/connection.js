import mongoose from 'mongoose';
import ApplicationModel from "./schemas/application.js";
import fs from "fs";
import csv from "csv-parser";
import ResumeModel from "./schemas/resumes.js";

export const createConnection = async () => {
  try {
    const dbUri = 'mongodb://root:example@mongo:27017/HRMPortal?authSource=admin'
    const connection = await mongoose.connect(dbUri, {
        connectTimeoutMS: 30000,
    });
    console.log('Connection successful')
  } catch (error) {
    console.log(error);
  }
};


async function isCollectionEmpty(collectionName) {
    let count = 0
    if(collectionName === 'Applications')
        count = await ApplicationModel.countDocuments()
    if(collectionName === 'Resumes')
        count = await ResumeModel.countDocuments()
    return count === 0
}


async function insertDataFromCSV() {
    return new Promise((resolve, reject) => {
        const dataToInsert = [];
        fs.createReadStream('./src/data/applications_test.csv')
            .pipe(csv())
            .on('data', (row) => {
                dataToInsert.push(row)
            })
            .on('end', async () => {
                try {
                    await ApplicationModel.insertMany(dataToInsert)
                    console.log('CSV data successfully inserted into MongoDB!')
                    resolve()
                } catch (error) {
                    console.error('Error inserting data:', error)
                    reject(error);
                }
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error)
                reject(error);
            });
    });
}

const insertDataFromJSON = async () => {
    try {
        const jsonData = JSON.parse(fs.readFileSync('./src/data/resumes.json', 'utf8'))

        const result = await ResumeModel.insertMany(jsonData)
        console.log('Data inserted successfully:', result)
    } catch (error) {
        console.error('Error inserting data:', error)
    }
}


export async function initializeDatabase() {

    if (await isCollectionEmpty('Applications')) {
        console.log('Collection Applications is empty. Inserting data from CSV.')
        await insertDataFromCSV();
    } else {
        console.log('Collection Applications already has data. Skipping CSV import.')
    }

    if (await isCollectionEmpty('Resumes')) {
        console.log('Collection Resumes is empty. Inserting data from json.')
        await insertDataFromJSON();
    } else {
        console.log('Collection Resumes already has data. Skipping json import.')
    }
}