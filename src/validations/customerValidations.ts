import { Database } from 'sqlite3';
import { customerSchema } from './schemas/customer.schema';

export function validateCustomerSchema(data: { name: string; email: string }) {
    const { error } = customerSchema.validate(data);
    if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
}

export async function isCustomerEmailUnique(db: Database, email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Customers WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!row);
            }
        });
    });
}
