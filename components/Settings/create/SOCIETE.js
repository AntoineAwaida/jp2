export default function SOCIETE(tx) {
  return tx.executeSql(`CREATE TABLE SOCIETE (
        Adr1 nvarchar(36) NULL
      , Adr2 nvarchar(36) NULL
      , Adr3 nvarchar(36) NULL
      , Code_CompteEscompte nvarchar(10) NULL
      , CP nvarchar(7) NULL
      , DateDebSaisie1 datetime NULL
      , DateDebSaisie2 datetime NULL
      , DateFinSaisie1 datetime NULL
      , DateFinSaisie2 datetime NULL
      , DebutExer1 datetime NULL
      , DebutExer2 datetime NULL
      , EMail nvarchar(50) NULL
      , Fax nvarchar(20) NULL
      , FinExer1 datetime NULL
      , FinExer2 datetime NULL
      , NomSociete nvarchar(25) NULL
      , NumSoc smallint NOT NULL
      , Pays nvarchar(20) NULL
      , Siret nvarchar(14) NULL
      , Tel nvarchar(20) NULL
      , Ville nvarchar(36) NULL
      , ZoneN1 float NULL
      , ZoneN2 float NULL
      , ZoneN3 float NULL
      , ZoneN4 float NULL
      , ZoneN5 float NULL
      , ZoneT1 nvarchar(100) NULL
      , ZoneT2 nvarchar(100) NULL
      , ZoneT3 nvarchar(50) NULL
      , ZoneT4 nvarchar(50) NULL
      , ZoneT5 nvarchar(50) NULL
      , Logo image NULL
      )`);
}
