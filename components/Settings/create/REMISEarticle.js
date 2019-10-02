export default function REMISEarticle(tx) {
  return tx.executeSql(`CREATE TABLE REMISEarticle (
        Code_Article nvarchar(18) NOT NULL
      , Code_Client nvarchar(8) NOT NULL
      , DebutPromo datetime NULL
      , FinPromo datetime NULL
      , Remise1 float NULL
      , Remise2 float NULL
      , Remise3 float NULL
      , RemisePromo1 float NULL
      , RemisePromo2 float NULL
      , RemisePromo3 float NULL
      )`);
}
