export default function TARIFarticlePrix(tx) {
  return tx.executeSql(`CREATE TABLE TARIFarticlePrix (
        Code_Article nvarchar(18) NOT NULL
      , Code_Tarif nvarchar(8) NOT NULL
      , Libelle nvarchar(52) NULL
      , NumPlage smallint NULL
      , PrixUnitaire money NULL
      , QteMini float NOT NULL
      )`);
}
