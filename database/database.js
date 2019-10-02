'use strict';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = 'alfoz.db';
let conn = SQLite.openDatabase({name: database_name});

class Database {
  constructor() {
    this.database = null;
  }

  getConnection() {
    return conn;
  }

  open() {
    this.getConnection().then(db => {
      this.database = db;
      return db;
    });
  }

  close() {
    this.database.close().then(() => {
      this.database = null;
    });
  }

  async getDatabase() {
    if (this.database !== null) {
      return this.database;
    }

    await Promise.resolve(this.open());
    return this.database;
  }
}
export const DB = new Database();
