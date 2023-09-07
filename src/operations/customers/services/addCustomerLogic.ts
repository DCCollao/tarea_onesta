import { Database } from 'sqlite3';
import { isCustomerEmailUnique } from '../../../validations/customerValidations';
import { Customer } from '../../../types/models';

export async function addCustomerLogic(db: Database, data: { name: string; email: string; }): Promise<number> {
    const unique = await isCustomerEmailUnique(db, data.email);
    
    if (unique) {
        const sql = 'INSERT INTO Customers (name, email) VALUES (?, ?)';
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
        // Si el correo electrónico ya existe, obtén el ID del cliente existente y devuélvelo
        const sql = 'SELECT id FROM Customers WHERE email = ?';
        return new Promise<number>((resolve, reject) => {
            db.get(sql, [data.email], (err, row: Customer) => {
                if (err) {
                    reject(err);
                } else if (row && row.id) {
                    resolve(row.id);
                } else {
                    reject(new Error("Unable to retrieve customer ID."));
                }
            });
        });
    }
}




