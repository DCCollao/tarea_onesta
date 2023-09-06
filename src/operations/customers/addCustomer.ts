import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { isCustomerEmailUnique } from '../../validations/customerValidations';

async function addCustomer(req: Request, res: Response) {
    const db = getDatabase();
    const { name, email } = req.body;

    try {
        const unique = await isCustomerEmailUnique(db, email);
        
        if (!unique) {
            res.status(409).json({ error: 'Email already exists.' });
            return;
        }

        const sql = 'INSERT INTO Customers (name, email) VALUES (?, ?)';
        db.run(sql, [name, email], function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}

export { addCustomer };
