import { getDatabase } from '../../../db';
import { runQuery } from '../../../utils/dbHelpers';

export async function addFarmerLogic(data: { name: string, email: string }): Promise<number> {
    const db = getDatabase();
    const { name, email } = data;
    const sql = 'INSERT INTO Farmers (name, email) VALUES (?, ?)';
    const lastID = await runQuery(db, sql, [name, email]);
    return lastID;
}