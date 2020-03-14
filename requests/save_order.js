import connect from './connect';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchRequest, saveOrder} from './fetch';

async function save_commande(gps, client, price) {
  let latitude;
  let longitude;
  if (!gps) {
    latitude = null;
    longitude = null;
  } else {
    latitude = gps.latitude;
    longitude = gps.longitude;
  }
  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);
  let DateCreation = moment().format('YYYYMMDD HH:mm:ss');
  DateCreation = "'" + DateCreation + "'";
  let query = `INSERT INTO ipad_COMMANDE(Code_Client, Code_Util, DateCreation, MontantAcompte, ZoneN4, ZoneN5, status) OUTPUT INSERTED.ID VALUES (${"'" +
    client +
    "'"}, ${"'" +
    user.Code_Utilisateur +
    "'"}, ${DateCreation}, ${price}, ${latitude}, ${longitude}, 'pending'  )`;

  return query;
}

function save_commande_composition(article, numLigne) {
  let query = `INSERT INTO ipad_COMMANDEcomposition(Code_Commande, Code_Article, Quantite, QuantiteInitiale, PrixUnitaire, NumLigne, status) VALUES (@id, ${
    article.Code_Article
  }, ${article.quantity}, ${article.quantity}, ${Math.round(
    (article.price / article.quantity) * 100,
  ) / 100}, ${numLigne}, 'ok')`;

  return query;
}

export default async function save_order(gps, client, price, articles) {
  return new Promise(async (resolve, reject) => {
    try {
      let id; //pb : récupérer l'id de la commande créée dans ipad_COMMANDE!!
      let queries = [];

      let commande = [];
      commande = await save_commande(gps, client, price);

      let comp = [];

      articles.map((article, i) => {
        let query = save_commande_composition(article, i + 1);
        comp = [...comp, query];
      });

      let result = await saveOrder(commande, comp);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}
