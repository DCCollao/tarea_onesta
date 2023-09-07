import { validateHarvestSchema } from '../../../validations/harvestValidations';
import { runQuery } from '../../../utils/dbHelpers';
import { Database } from 'sqlite3';

export async function addHarvestLogic(db: Database, data: { variety_id: number, field_id: number, harvest_date: string, quantity: number }): Promise<number> {
    const { variety_id, field_id, harvest_date, quantity } = data;

    validateHarvestSchema(data);

    const sql = 'INSERT INTO Harvests (variety_id, field_id, harvest_date, quantity) VALUES (?, ?, ?, ?)';
    const lastID = await runQuery(db, sql, [variety_id, field_id, harvest_date, quantity]);
    return lastID;
}
