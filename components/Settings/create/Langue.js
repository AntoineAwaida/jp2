export default function Langue(tx) {
  return tx.executeSql(`CREATE TABLE Langue (
        IdLangue int NOT NULL
      , NomForm nvarchar(100) NOT NULL
      , NomChamp nvarchar(100) NOT NULL
      , TexteTraduit nvarchar(255) NULL
      )`);
}
