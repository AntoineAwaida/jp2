export default function p_Famille(tx) {
  return tx.executeSql(` CREATE TABLE p_Famille (
        Code nvarchar(4) NOT NULL
      , Libelle nvarchar(30) NULL
      , CodeDefaut bit NULL
      , SupAutorisee bit NULL
      )`);
}
