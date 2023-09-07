import { Database } from 'sqlite3';
import { farmerSchema } from './schemas/farmer.schema';

export function validateFarmerSchema(data: { name: string; email: string }) {
    const { error } = farmerSchema.validate(data);
    if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
}

export async function isFarmerEmailUnique(db: Database, email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Farmers WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!row);
            }
        });
    });
}
