export default function Traduction(tx) {
  return tx.executeSql(`CREATE TABLE Traduction (
        Cle int IDENTITY (1,1) NOT NULL
      , TexteINI nvarchar(100) NULL
      , NumLangue smallint NULL
      , TexteTraduit nvarchar(100) NULL
      )`);
}
