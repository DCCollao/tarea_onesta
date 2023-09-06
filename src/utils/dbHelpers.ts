import { Database } from 'sqlite3';

export function runQuery(db: Database, query: string, params: any[]): Promise<number> {
    return new Promise((resolve, reject) => {
        db.run(query, params, function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
}
