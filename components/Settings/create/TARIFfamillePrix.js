export default function TARIFfamillePrix(tx) {
  return tx.executeSql(`CREATE TABLE TARIFfamillePrix (
        Code_Famille nvarchar(4) NOT NULL
      , Code_Tarif nvarchar(8) NOT NULL
      , NumPlage smallint NULL
      , PrixUnitaire money NULL
      , QteMini float NOT NULL
      )`);
}
