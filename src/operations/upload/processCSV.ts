import { Request, Response } from 'express';
import fs from 'fs';
import Papa from 'papaparse';
import { addFarmerLogic } from '../farmers/services/addFarmerLogic';
import { addFieldLogic } from '../fields/services/addFieldLogic';
import { addHarvestLogic } from '../harvests/services/addHarvestLogic';
import { addCustomerLogic } from '../customers/services/addCustomerLogic';
import { addFruitLogic } from '../fruits/services/addFruitLogic';
import { addVarietyLogic } from '../fruitVarieties/services/addVarietyLogic';
import { CSVRow } from '../../types/csvTypes';
import { createPayload } from '../../utils/createPayload';
import { getDatabase } from '../../db';

async function processCSV(req: Request, res: Response) {
    const file = req.file;
    const db = getDatabase();

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const csvData = fs.readFileSync(file.path, 'utf8');

    Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
            for (const row of results.data) {
                try {
                    const csvRow = row as CSVRow;

                    const farmerReq = createPayload({
                        name: `${csvRow['Nombre Agricultor']} ${csvRow['Apellido Agricultor']}`,
                        email: csvRow['Mail Agricultor']
                    });
                    const lastFarmerID = await addFarmerLogic(db, farmerReq.body);

                    const customerReq = createPayload({
                        name: `${csvRow['Nombre Cliente']} ${csvRow['Apellido Cliente']}`,
                        email: csvRow['Mail Cliente']
                    });
                    const lastCustomerID = await addCustomerLogic(db, customerReq.body);

                    const fieldReq = createPayload({
                        name: csvRow['Nombre Campo'],
                        location: csvRow['Ubicación de Campo'],
                        farmer_id: lastFarmerID
                    });
                    const lastFieldID = await addFieldLogic(db, fieldReq.body);

                    const harvestReq = createPayload({
                        variety_id: lastFieldID,
                        field_id: lastFieldID,
                        harvest_date: new Date().toISOString().split('T')[0], 
                        quantity: 1000 
                    });
                    await addHarvestLogic(db, harvestReq.body);

                    // Insertar fruta
                    const fruitReq = createPayload({
                        name: csvRow['Fruta Cosechada']
                    });
                    const lastFruitID = await addFruitLogic(db, fruitReq.body);

                    // Insertar variedad
                    const varietyReq = createPayload({
                        fruit_id: lastFruitID,
                        variety: csvRow['Variedad Cosechada']
                    });
                    await addVarietyLogic(db, varietyReq.body);

                } catch (err) {
                    console.error(`Error processing row: ${JSON.stringify(row)}. Error: ${(err as Error).message}`);
                }
            }
            res.status(200).json({ message: 'Data uploaded successfully' });
        }
    });
}

export { processCSV };
