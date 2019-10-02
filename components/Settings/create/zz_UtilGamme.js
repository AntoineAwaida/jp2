export default function zz_UtilGamme(tx) {
  return tx.executeSql(`CREATE TABLE zz_UtilGamme (
        Code_Utilisateur nvarchar(20) NOT NULL
        , Code_Gamme nvarchar(10) NOT NULL
        , Option1 int NULL
        , ZoneT1 nvarchar(50) NULL
        , ZoneN1 float NULL
        , Actif int NULL
        )`);
}
