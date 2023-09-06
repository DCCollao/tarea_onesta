// src/csv/processCSV.ts
import { Request, Response } from 'express';
import fs from 'fs';
import Papa from 'papaparse';
import { getDatabase } from '../../db';
import { addFarmer } from '../farmers/addFarmer';
import { addField } from '../fields/addField';
import { addHarvest } from '../harvests/addHarvest';
import { addCustomer } from '../customers/addCustomer';
import { CSVRow } from '../../types/csvTypes';
import { createPayload } from '../../utils/createPayload';

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
                const csvRow = row as CSVRow;

                // Insertar agricultor
                const farmerReq = createPayload({
                    name: `${csvRow['Nombre Agricultor']} ${csvRow['Apellido Agricultor']}`,
                    email: csvRow['Mail Agricultor']
                });
                const lastFarmerID = await addFarmer(farmerReq, res);

                // Insertar cliente
                const customerReq = createPayload({
                    name: `${csvRow['Nombre Cliente']} ${csvRow['Apellido Cliente']}`,
                    email: csvRow['Mail Cliente']
                });
                const lastCustomerID = await addCustomer(customerReq, res);

                // Insertar campo
                const fieldReq = createPayload({
                    name: csvRow['Nombre Campo'],
                    location: csvRow['Ubicación de Campo'],
                    farmer_id: lastFarmerID
                });
                const lastFieldID = await addField(fieldReq, res);

                // Insertar cosecha
                const harvestReq = createPayload({
                    variety_id: lastFieldID, // Aquí asumimos que la variedad es la última insertada
                    field_id: lastFieldID,
                    harvest_date: new Date().toISOString().split('T')[0], // Fecha actual como ejemplo
                    quantity: 1000 // Cantidad como ejemplo
                });
                await addHarvest(harvestReq, res);
            }
            res.status(200).json({ message: 'Data uploaded successfully' });
        }
    });
}

export { processCSV };
