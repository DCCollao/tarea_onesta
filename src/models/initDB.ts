import { getDatabase } from '../db';

export function initDB(): void {
  const db = getDatabase();

  const queries = [
    // Fruits
    `CREATE TABLE IF NOT EXISTS Fruits (
       id INTEGER PRIMARY KEY,
       name TEXT UNIQUE NOT NULL
     )`,

    // Ftuir Varieties
    `CREATE TABLE IF NOT EXISTS FruitVarieties (
       id INTEGER PRIMARY KEY,
       fruit_id INTEGER REFERENCES Fruits(id),
       variety TEXT NOT NULL,
       UNIQUE(fruit_id, variety)
     )`,

    // Farmers
    `CREATE TABLE IF NOT EXISTS Farmers (
       id INTEGER PRIMARY KEY,
       name TEXT NOT NULL,
       email TEXT UNIQUE NOT NULL
     )`,

    // Fields
    `CREATE TABLE IF NOT EXISTS Fields (
       id INTEGER PRIMARY KEY,
       farmer_id INTEGER REFERENCES Farmers(id),
       name TEXT NOT NULL,
       location TEXT NOT NULL,
       UNIQUE(name, location)
     )`,

    // Harvests
    `CREATE TABLE IF NOT EXISTS Harvests (
       id INTEGER PRIMARY KEY,
       variety_id INTEGER REFERENCES FruitVarieties(id),
       field_id INTEGER REFERENCES Fields(id),
       harvest_date DATE NOT NULL,
       quantity INTEGER NOT NULL
     )`,

    // Customers
    `CREATE TABLE IF NOT EXISTS Customers (
       id INTEGER PRIMARY KEY,
       name TEXT NOT NULL,
       email TEXT UNIQUE NOT NULL
     )`
  ];

  queries.forEach((query) => db.run(query));
}
