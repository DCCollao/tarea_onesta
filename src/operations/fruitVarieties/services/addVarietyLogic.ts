import { Database } from 'sqlite3';
import { isFruitVarietyCombinationUnique } from '../../../validations/fruitVarietyValidations';
import { Fruit } from '../../../types/models';

export async function addVarietyLogic(db: Database, data: { fruit_id: number; variety: string; }): Promise<number> {
    const unique = await isFruitVarietyCombinationUnique(db, data.fruit_id, data.variety);
    
    if (unique) {
        const sql = 'INSERT INTO FruitVarieties (fruit_id, variety) VALUES (?, ?)';
        return new Promise<number>((resolve, reject) => {
            db.run(sql, [data.fruit_id, data.variety], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    } else {
        const sql = 'SELECT id FROM FruitVarieties WHERE fruit_id = ? AND variety = ?';
        return new Promise<number>((resolve, reject) => {
            db.get(sql, [data.fruit_id, data.variety], (err, row: Fruit) => {
                if (err) {
                    reject(err);
                } else if (row && row.id) {
                    resolve(row.id);
                } else {
                    reject(new Error("Unable to retrieve variety ID."));
                }
            });
        });
    }
}
