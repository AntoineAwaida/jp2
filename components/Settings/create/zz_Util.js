export default function zz_Util(tx) {
  return tx.executeSql(`CREATE TABLE zz_Util (
        Code_Groupe nvarchar(20) NULL
      , Code_Utilisateur nvarchar(20) NOT NULL
      , MotPasse nvarchar(50) NULL
      , Nom nvarchar(50) NULL
      , Langue int NULL
      , Ville nvarchar(10) NULL
      )`);
}
