import { Database } from 'sqlite3';
import { isFieldNameLocationUnique } from '../../../validations/fieldValidations';
import { Field } from '../../../types/models';

export async function addFieldLogic(db: Database, data: { name: string; location: string; farmer_id: number; }): Promise<number> {
    const unique = await isFieldNameLocationUnique(db, data.name, data.location);
    
    if (unique) {
        const sql = 'INSERT INTO Fields (name, location, farmer_id) VALUES (?, ?, ?)';
        return new Promise<number>((resolve, reject) => {
            db.run(sql, [data.name, data.location, data.farmer_id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    } else {
        // Si la combinación de nombre y ubicación ya existe, obtén el ID del campo existente y devuélvelo
        const sql = 'SELECT id FROM Fields WHERE name = ? AND location = ?';
        return new Promise<number>((resolve, reject) => {
            db.get(sql, [data.name, data.location], (err, row: Field) => {
                if (err) {
                    reject(err);
                } else if (row && row.id) {
                    resolve(row.id);
                } else {
                    reject(new Error("Unable to retrieve field ID."));
                }
            });
        });
    }
}


