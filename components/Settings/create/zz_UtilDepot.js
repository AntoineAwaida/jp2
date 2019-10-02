export default function zz_UtilDepot(tx) {
  return tx.executeSql(`CREATE TABLE zz_UtilDepot (
    Code_Utilisateur nvarchar(20) NOT NULL
  , Code_Depot nvarchar(4) NOT NULL
  , Option1 int NULL
  , ZoneT1 nvarchar(50) NULL
  , ZoneN1 float NULL
  , Actif int NULL
  )`);
}
