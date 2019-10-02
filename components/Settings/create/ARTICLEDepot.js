export default function ARTICLEDepot(tx) {
  return tx.executeSql(`CREATE TABLE ARTICLEDepot (
        Code_Article nvarchar(18) NOT NULL COLLATE NOCASE
      , StockDepot float
      );`);
}
