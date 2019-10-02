export default function REMISEfamille(tx) {
  return tx.executeSql(`CREATE TABLE REMISEfamille (
        Code_Client nvarchar(8) NOT NULL
      , Code_Famille nvarchar(4) NOT NULL
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
