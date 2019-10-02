export default function pct_COMMANDEComposition(tx) {
  return tx.executeSql(`CREATE TABLE pct_COMMANDEcomposition (
        BonValide bit NULL
      , ChargesFixes money NULL
      , Code_Article nvarchar(18) NULL
      , Code_Commande int NOT NULL
      , Code_Depot nvarchar(4) NULL
      , CodeAnalytique nvarchar(10) NULL
      , CoefCharges float NULL
      , Commission float NULL
      , DateBL datetime NULL
      , DateCreationLigne datetime NULL
      , DateFacture datetime NULL
      , DateModifLigne datetime NULL
      , DelaiLiv int NULL
      , Designation nvarchar(80) NULL
      , JourLiv datetime NULL
      , Livre bit NULL
      , MontHt_DC money NULL
      , MontHt_DL money NULL
      , MontHt_EURO money NULL
      , NumAR int NULL
      , NumBL int NULL
      , NumBP int NULL
      , NumColis nvarchar(10) NULL
      , NumFacturation int NULL
      , NumFacture int NULL
      , NumLigne int NOT NULL
      , NumSousFacture int NULL
      , PMPA money NULL
      , PrixAchat money NULL
      , PrixAuto bit NULL
      , PrixCumule bit NULL
      , PrixRevient money NULL
      , PrixUnitaire money NULL
      , PrixUnitaire_DL money NULL
      , PrixUnitaire_EURO money NULL
      , Quantite float NULL
      , Remise1 float NULL
      , Remise2 float NULL
      , Remise3 float NULL
      , TypeArticle smallint NULL
      , TypeStock smallint NULL
      , ZoneN1compo float NULL
      , ZoneN2compo float NULL
      , ZoneN3compo float NULL
      , ZoneN4compo float NULL
      , ZoneN5compo float NULL
      , ZoneT1compo nvarchar(40) NULL
      , ZoneT2compo nvarchar(40) NULL
      , ZoneT3compo nvarchar(40) NULL
      , ZoneT4compo nvarchar(40) NULL
      , ZoneT5compo nvarchar(40) NULL
      , nomPoste nvarchar(50) NOT NULL
      )`);
}
