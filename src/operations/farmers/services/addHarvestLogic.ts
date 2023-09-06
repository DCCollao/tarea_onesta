import { getDatabase } from '../../../db';
import { runQuery } from '../../../utils/dbHelpers';

export async function addHarvestLogic(data: { variety_id: number, field_id: number, harvest_date: string, quantity: number }): Promise<number> {
    const db = getDatabase();
    const { variety_id, field_id, harvest_date, quantity } = data;
    const sql = 'INSERT INTO Harvests (variety_id, field_id, harvest_date, quantity) VALUES (?, ?, ?, ?)';
    const lastID = await runQuery(db, sql, [variety_id, field_id, harvest_date, quantity]);
    return lastID;
}
