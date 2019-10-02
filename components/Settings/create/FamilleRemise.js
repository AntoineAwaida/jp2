export default function FamilleRemise(tx) {
  return tx.executeSql(`CREATE TABLE FamilleRemise (
        Code_Famille nvarchar(4) NOT NULL
      , Code_Remise nvarchar(4) NOT NULL
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
