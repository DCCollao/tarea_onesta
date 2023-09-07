import { Database } from 'sqlite3';
import { isFarmerEmailUnique } from '../../../validations/farmerValidations';
import { Farmer } from '../../../types/models';

export async function addFarmerLogic(db: Database, data: { name: string; email: string; }): Promise<number> {
    const unique = await isFarmerEmailUnique(db, data.email);
    
    if (unique) {
        const sql = 'INSERT INTO Farmers (name, email) VALUES (?, ?)';
        return new Promise<number>((resolve, reject) => {
            db.run(sql, [data.name, data.email], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    } else {
        const sql = 'SELECT id FROM Farmers WHERE email = ?';
        return new Promise<number>((resolve, reject) => {
            db.get(sql, [data.email], (err, row: Farmer) => {
                if (err) {
                    reject(err);
                } else if (row && row.id) {
                    resolve(row.id);
                } else {
                    reject(new Error("Unable to retrieve farmer ID."));
                }
            });
        });
    }
}
