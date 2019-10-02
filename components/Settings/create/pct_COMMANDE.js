export default function pct_COMMANDE(tx) {
  return tx.executeSql(`CREATE TABLE pct_COMMANDE (
        AccuseReception bit NULL
      , AdrLivraison1 nvarchar(36) NULL
      , AdrLivraison2 nvarchar(36) NULL
      , AdrLivraison3 nvarchar(36) NULL
      , Avoir bit NULL
      , Code_Client nvarchar(8) NULL
      , Code_Commande int NOT NULL
      , Code_DepotDef nvarchar(4) NULL
      , Code_Devise nvarchar(4) NULL
      , Code_Emb nvarchar(4) NULL
      , Code_OffreClient int NULL
      , Code_Origine nvarchar(4) NULL
      , Code_PaysOrigine nvarchar(4) NULL
      , Code_Port nvarchar(4) NULL
      , Code_Reglement nvarchar(4) NULL
      , Code_Representant nvarchar(8) NULL
      , Code_Transport nvarchar(4) NULL
      , Commentaire nvarchar(120) NULL
      , CommentaireAR nvarchar(120) NULL
      , CommentaireBL nvarchar(120) NULL
      , CommentaireBP nvarchar(120) NULL
      , CommentaireF nvarchar(120) NULL
      , CPLivraison nvarchar(7) NULL
      , DateCreation datetime NULL
      , DateDepMarchandise datetime NULL
      , DateEchPret datetime NULL
      , DateFacturation datetime NULL
      , DateModif datetime NULL
      , EmailLivraison nvarchar(50) NULL
      , Escompte float NULL
      , FaxLivraison nvarchar(20) NULL
      , Interlocuteur nvarchar(50) NULL
      , JourQuantiemeReg smallint NULL
      , LivraisonAuto bit NULL
      , LivraisonPartielle bit NULL
      , MontantAcompte money NULL
      , MontantAcompte_DC money NULL
      , MontantAcompte_EURO money NULL
      , MontantEmb money NULL
      , MontantEmb_DC money NULL
      , MontantEmb_EURO money NULL
      , MontantPort money NULL
      , MontantPort_DC money NULL
      , MontantPort_EURO money NULL
      , NbColis smallint NULL
      , NbJourReg smallint NULL
      , PaysLivraison nvarchar(20) NULL
      , Poids float NULL
      , Pret smallint NULL
      , ProForma bit NULL
      , QuantiemeReg smallint NULL
      , Reference nvarchar(40) NULL
      , RemiseGlobale1 float NULL
      , RemiseGlobale2 float NULL
      , RemiseGlobale3 float NULL
      , TauxDevise float NULL
      , TauxEuro float NULL
      , TelLivraison nvarchar(20) NULL
      , Utilisateur nvarchar(20) NULL
      , VilleLivraison nvarchar(36) NULL
      , ZoneN1 float NULL
      , ZoneN2 float NULL
      , ZoneN3 float NULL
      , ZoneN4 float NULL
      , ZoneN5 float NULL
      , ZoneT1 nvarchar(40) NULL
      , ZoneT2 nvarchar(40) NULL
      , ZoneT3 nvarchar(40) NULL
      , ZoneT4 nvarchar(40) NULL
      , ZoneT5 nvarchar(40) NULL
      , nomPoste nvarchar(50) NOT NULL
      )`);
}
