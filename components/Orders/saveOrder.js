import { DB } from "../../database/database";

export default function saveOrder() {
  DB.getDatabase().then(db => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM CLIENT WHERE RaisonSociale LIKE '%0%'`,
        [],
        (tx, results) => {
          return results;
        }
      );
    });
  });
}
