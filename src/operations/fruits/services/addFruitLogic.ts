import { Database } from 'sqlite3';
import { isFruitNameUnique } from '../../../validations/fruitValidations';
import { Fruit } from '../../../types/models';

export async function addFruitLogic(db: Database, data: { name: string; }): Promise<number> {
    const unique = await isFruitNameUnique(db, data.name);
    
    if (unique) {
        const sql = 'INSERT INTO Fruits (name) VALUES (?)';
        return new Promise<number>((resolve, reject) => {
            db.run(sql, [data.name], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    } else {
        const sql = 'SELECT id FROM Fruits WHERE name = ?';
        return new Promise<number>((resolve, reject) => {
            db.get(sql, [data.name], (err, row: Fruit) => {
                if (err) {
                    reject(err);
                } else if (row && row.id) {
                    resolve(row.id);
                } else {
                    reject(new Error("Unable to retrieve fruit ID."));
                }
            });
        });
    }
}
