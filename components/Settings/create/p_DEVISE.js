export default function p_DEVISE(tx) {
  return tx.executeSql(`CREATE TABLE p_DEVISE (
        Code nvarchar(4) NOT NULL
      , Libelle nvarchar(30) NULL
      , MultiplierParTaux bit NULL
      , Europeenne bit NULL
      , NbDecimales smallint NULL
      , Code_Journal nvarchar(4) NULL
      , Code_CptGain nvarchar(10) NULL
      , Code_CptPerte nvarchar(10) NULL
      , Code_AnaGain nvarchar(10) NULL
      , Code_AnaPerte nvarchar(10) NULL
      , SeuilGain money NULL
      , Code_CptGainConv nvarchar(10) NULL
      , Code_CptPerteConv nvarchar(10) NULL
      , Code_AnaGainConv nvarchar(10) NULL
      , Code_AnaPerteConv nvarchar(10) NULL
      , CodeDefaut bit NULL
      , SupAutorisee bit NULL
      , LibelleCourt nvarchar(4) NULL
      , DeviseEuro bit NULL
      )`);
}
