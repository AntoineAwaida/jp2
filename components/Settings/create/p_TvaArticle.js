export default function p_TvaArticle(tx) {
  return tx.executeSql(`CREATE TABLE p_TvaArticle (
        Code nvarchar(5) NOT NULL
      , Libelle nvarchar(30) NULL
      , CodeDefaut bit NULL
      , SupAutorisee bit NULL
      )`);
}
