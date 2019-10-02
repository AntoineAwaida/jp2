export default function TAUXtva(tx) {
  return tx.executeSql(`CREATE TABLE TAUXtva (
        Code_CompteTVA nvarchar(10) NULL
      , Code_Taux nvarchar(8) NOT NULL
      , Code_TvaArticle nvarchar(5) NULL
      , Code_TvaClient nvarchar(4) NULL
      , DebitEncais nvarchar(1) NULL
      , LibelleTaux nvarchar(30) NULL
      , TauxTVA float NULL
      , TvaIntracom bit NULL
      , Zonet1 nvarchar(15) NULL
      )`);
}
