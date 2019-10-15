import MSSQL from 'react-native-mssql';
import connect from './connect';
import AsyncStorage from '@react-native-community/async-storage';

export default async function get_articles(criterias, search) {
  await connect();
  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);

  const famille =
    criterias.famille.length > 0
      ? '(' +
        criterias.famille
          .map(function(a) {
            return "'" + a.Code.replace("'", "''") + "'";
          })
          .join() +
        ')'
      : null;

  const sous_famille =
    criterias.sous_famille.length > 0
      ? '(' +
        criterias.sous_famille
          .map(function(a) {
            return "'" + a.Code.replace("'", "''") + "'";
          })
          .join() +
        ')'
      : null;

  const gamme =
    criterias.gamme.length > 0
      ? '(' +
        criterias.gamme
          .map(function(a) {
            return "'" + a.Code.replace("'", "''") + "'";
          })
          .join() +
        ')'
      : null;

  const qualite =
    criterias.qualite.length > 0
      ? '(' +
        criterias.qualite
          .map(function(a) {
            return "'" + a.Code.replace("'", "''") + "'";
          })
          .join() +
        ')'
      : null;

  let query = `SELECT TOP 100 * FROM ARTICLE AS t 
  JOIN TARIFarticlePrix AS x
  ON t.Code_Article = x.Code_Article WHERE CODE_FAMILLE IN ( SELECT CODE_GAMME FROM zz_UtilGamme WHERE Code_Utilisateur= ${"'" +
    user.Code_Utilisateur +
    "'"})`;

  if (famille) {
    query = query + ` AND CODE_FAMILLE IN ${famille} `;
  }

  if (sous_famille) {
    query = query + `AND CODE_SOUSFAMILLE IN ${sous_famille}`;
  }

  if (gamme) {
    query = query + `AND CODE_GAMME IN ${gamme}`;
  }

  if (qualite) {
    query = query + `AND CODE_QUALITE IN ${qualite}`;
  }

  if (search.length > 0) {
    console.log(search);
    query = query + `AND t.Code_Article LIKE '%${search}%'`;
  }

  const results = await MSSQL.executeQuery(query);
  return results;
}
