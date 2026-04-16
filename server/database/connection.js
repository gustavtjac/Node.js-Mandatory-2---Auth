import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

//Laver vores connectoin - opretter db hvis den ikke eksisterer
const connection = await open({
    filename: 'mandatory.db',
    driver: sqlite3.Database
});

export default connection;