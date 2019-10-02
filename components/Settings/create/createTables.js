import { DB } from "../../../database/database";
import zz_UtilGamme from "./zz_UtilGamme";
import Tournee from "./Tournee";
import zz_UtilDepot from "./zz_UtilDepot";
import zz_Util from "./zz_Util";
import Traduction from "./Traduction";

import TAUXtva from "./TAUXtva";

import TARIFfamillePrix from "./TARIFfamillePrix";
import TARIFarticlePrix from "./TARIFarticlePrix";
import SOCIETE from "./SOCIETE";
import REMISEfamille from "./REMISEfamille";
import REMISEarticle from "./REMISEarticle";
import pct_COMMANDEComposition from "./pct_COMMANDEComposition";
import pct_COMMANDE from "./pct_COMMANDE";
import pct_Client from "./pct_Client";
import p_TvaClient from "./p_TvaClient";
import p_TvaArticle from "./p_TvaArticle";
import p_Tarif from "./p_Tarif";
import p_SousFamille from "./p_SousFamille";
import p_Remise from "./p_Remise";
import p_Famille from "./p_Famille";
import p_DEVISE from "./p_DEVISE";
import Langue from "./Langue";
import FamilleRemise from "./FamilleRemise";
import CLIENT from "./CLIENT";
import ARTICLEremise from "./ARTICLEremise";
import ARTICLEnomenclature from "./ARTICLEnomenclature";
import ARTICLE from "./ARTICLE";

import ARTICLEDepot from "./ARTICLEDepot";

export default function createTables() {
  return new Promise(resolve =>
    DB.getDatabase().then(db => {
      db.transaction(
        tx => {
          //drop avant!

          //remplir zz_Util
          tx.executeSql("BEGIN TRANSACTION");
          zz_UtilGamme(tx);
          Tournee(tx);

          zz_Util(tx);
          zz_UtilDepot(tx);
          Traduction(tx);
          TAUXtva(tx);
          TARIFfamillePrix(tx);
          TARIFarticlePrix(tx);
          SOCIETE(tx);

          REMISEfamille(tx);

          REMISEarticle(tx);

          pct_COMMANDEComposition(tx);

          pct_COMMANDE(tx);

          pct_Client(tx);

          p_TvaClient(tx);

          p_TvaArticle(tx);

          ARTICLEDepot(tx);

          p_Tarif(tx);

          p_SousFamille(tx);

          p_Remise(tx);

          p_Famille(tx);

          p_DEVISE(tx);

          Langue(tx);

          FamilleRemise(tx);

          CLIENT(tx);

          ARTICLEremise(tx);

          ARTICLEnomenclature(tx);

          ARTICLE(tx);

          tx.executeSql("COMMIT");
        },
        err => {
          console.log(err);
          resolve(err);
        },
        () => {
          resolve("finished");
        }
      );
    })
  );
}
