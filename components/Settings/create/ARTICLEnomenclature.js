export default function ARTICLEnomenclature(tx) {
  return tx.executeSql(`CREATE TABLE ARTICLEnomenclature (
        Code_Article nvarchar(18) NULL
      , Code_SousArticle nvarchar(18) NULL
      , Designation nvarchar(80) NULL
      , Edite bit NULL
      , OrdreNome int IDENTITY (1,1) NOT NULL
      , Quantite float NULL
      )`);
}
