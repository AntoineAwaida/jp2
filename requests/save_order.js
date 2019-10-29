import MSSQL from 'react-native-mssql';
import connect from './connect';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

function save_commande(gps, client, price) {
  return new Promise(async (resolve, reject) => {
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

    await MSSQL.executeQuery(query)
      .then(res => {
        resolve(res[0].ID);
      })
      .catch(e => {
        reject(e);
      });
  });
}

function save_commande_composition(id, article, numLigne) {
  return new Promise(async (resolve, reject) => {
    let query = `INSERT INTO ipad_COMMANDEcomposition(Code_Commande, Code_Article, Quantite, QuantiteInitiale, PrixUnitaire, NumLigne, status) VALUES (${id}, ${
      article.Code_Article
    }, ${article.quantity}, ${article.quantity}, ${Math.round(
      (article.price / article.quantity) * 100,
    ) / 100}, ${numLigne}, 'ok')`;

    await MSSQL.executeUpdate(query)
      .then(res => {
        resolve('ok');
      })
      .catch(e => {
        reject(e);
      });
  });
}

export default async function save_order(gps, client, price, articles) {
  return new Promise(async (resolve, reject) => {
    try {
      await connect();
      try {
        await connect();
        await MSSQL.executeUpdate('BEGIN TRANSACTION');

        let id;
        try {
          id = await save_commande(gps, client, price);
        } catch (e) {
          throw Error(e);
        }

        await Promise.all(
          articles.map(async (article, i) => {
            try {
              await save_commande_composition(id, article, i + 1);
            } catch (e) {
              throw Error(e);
            }
          }),
        ).catch(e => {
          throw Error(e);
        });
        await MSSQL.executeUpdate('COMMIT');
        resolve(id);
      } catch (e) {
        await MSSQL.executeUpdate('ROLLBACK');
        reject(e);
      }
    } catch (e) {
      reject(e);
    }
  });
}
