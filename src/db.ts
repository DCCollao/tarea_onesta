import sqlite3, { Database } from 'sqlite3';

let db: Database;

function openDatabase(): void {
  db = new sqlite3.Database('./database/database.sqlite', (err) => {
    if (err) {
      console.error('Error when reading Database file', err);
    } else {
      console.log('Connected to database');
    }
  });
}

function getDatabase(): Database {
  if (!db) {
    throw new Error('Database doesn\'t exist. Please open it first.');
  }
  return db;
}

function closeDatabase(): void {
  db.close((err) => {
    if (err) {
      console.error('Error when terminating Database.', err);
    } else {
      console.log('Database terminated.');
    }
  });
}

export { openDatabase, getDatabase, closeDatabase };