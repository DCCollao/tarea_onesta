import { getDatabase } from '../../../db';
import { runQuery } from '../../../utils/dbHelpers';

export async function addFieldLogic(data: { name: string, location: string, farmer_id: number }): Promise<number> {
    const db = getDatabase();
    const { name, location, farmer_id } = data;
    const sql = 'INSERT INTO Fields (name, location, farmer_id) VALUES (?, ?, ?)';
    const lastID = await runQuery(db, sql, [name, location, farmer_id]);
    return lastID;
}
