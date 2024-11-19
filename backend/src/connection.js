import mongoose from 'mongoose';
import ApplicationModel from "./schemas/application.js";
import fs from "fs";
import csv from "csv-parser";

export const createConnection = async () => {
  try {
    const dbUri = 'mongodb://root:example@mongo:27017/HRMPortal?authSource=admin'
    const connection = await mongoose.connect(dbUri, {
        connectTimeoutMS: 30000,
    });
    console.log('Connection successful');
  } catch (error) {
    console.log(error);
  }
};


async function isCollectionEmpty() {
    const count = await ApplicationModel.countDocuments();
    return count === 0;
}


async function insertDataFromCSV() {
    return new Promise((resolve, reject) => {
        const dataToInsert = [];
        fs.createReadStream('./src/data/applications_test.csv')
            .pipe(csv())
            .on('data', (row) => {
                dataToInsert.push(row);
            })
            .on('end', async () => {
                try {
                    await ApplicationModel.insertMany(dataToInsert);
                    console.log('CSV data successfully inserted into MongoDB');
                    resolve();
                } catch (error) {
                    console.error('Error inserting data:', error);
                    reject(error);
                }
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                reject(error);
            });
    });
}


export async function initializeDatabase() {

    if (await isCollectionEmpty()) {
        console.log('Collection is empty. Inserting data from CSV.');
        await insertDataFromCSV();
    } else {
        console.log('Collection already has data. Skipping CSV import.');
    }
}