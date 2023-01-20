import connect from './connect';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchRequest} from './fetch';

export default async function get_articles(criterias, search, page) {
  await connect();
  let user = await AsyncStorage.getItem('user');
  let nbPage = await AsyncStorage.getItem('credentials');
  user = JSON.parse(user);
  nbPage = JSON.parse(nbPage).limitArticles;
  depot = JSON.parse(nbPage).depot;

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

  let query = `SELECT nomenclature, Designation, Code_Article, PrixUnitaire, DesignationAR FROM 
  
  ( SELECT nomenclature, RowNum, Designation, w.Code_Article AS Code_Article, t.PrixUnitaire, DesignationAR,stockdepot
    FROM (SELECT DesignationAR, n.Code_SousArticle AS nomenclature, t.Designation AS Designation, t.Code_Article AS Code_Article, d.StockDepot as stockdepot,  ROW_NUMBER() OVER (ORDER BY t.Designation) AS RowNum FROM ARTICLE AS t 
    JOIN TARIFarticlePrix AS w ON t.Code_Article = w.Code_Article 
    LEFT JOIN Article_Complement AS c ON t.Code_Article = c.Code_Article
    LEFT JOIN (SELECT Code_Article, Code_Depot, StockDepot FROM ARTICLEDepot WHERE Code_Depot = ${"'" +
      depot +
      "'"}) AS d ON t.Code_Article = d.Code_Article
    LEFT JOIN ARTICLEnomenclature AS n ON t.Code_Article = n.Code_SousArticle WHERE CODE_FAMILLE IN ( SELECT CODE_GAMME FROM zz_UtilGamme WHERE obsolete=0 and Code_Utilisateur= ${"'" +
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

  query = query + `AND ZoneN5 <> 0`;

  if (search.length > 0) {
    query =
      query +
      ` AND (t.Code_Article LIKE '%${search}%' OR t.Designation LIKE '%${search}%' )`;
  }

  query =
    query +
    ` ) AS w JOIN TARIFarticlePrix AS t ON w.Code_Article = t.Code_Article ) AS Derived WHERE Derived.RowNum BETWEEN ${page *
      nbPage} AND ${(page + 1) * nbPage} `;

  const results = await fetchRequest(query);
  return results;
}
