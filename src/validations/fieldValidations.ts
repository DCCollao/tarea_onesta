import { Database } from 'sqlite3';
import { fieldSchema } from './schemas/field.schema';

export function validateFieldSchema(data: { name: string; location: string; farmer_id: number }) {
    const { error } = fieldSchema.validate(data);
    if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
}

export async function isFieldNameLocationUnique(db: Database, name: string, location: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Fields WHERE name = ? AND location = ?';
        db.get(sql, [name, location], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!row);
            }
        });
    });
}
