export default function ARTICLEremise(tx) {
  return tx.executeSql(` CREATE TABLE ARTICLEremise (
        Code_Article nvarchar(18) NOT NULL
      , Code_Remise nvarchar(4) NOT NULL
      , Remise1 float NULL
      )`);
}
