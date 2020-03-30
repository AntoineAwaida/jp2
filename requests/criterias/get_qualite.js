import AsyncStorage from '@react-native-community/async-storage';
import {fetchRequest} from '../fetch';
import getRequestString from './getRequestString';

export default async function get_qualite(criteria) {
  const familiesSelected = criteria.famille.map(e => e.Code);
  const subfamiliesSelected = criteria.sous_famille.map(e => e.Code);
  const gammesSelected = criteria.gamme.map(e => e.Code);
  let families = getRequestString(familiesSelected);
  let subfamilies = getRequestString(subfamiliesSelected);
  let gammes = getRequestString(gammesSelected);

  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);

  let query = `SELECT Code, Libelle FROM p_Qualite AS p JOIN (SELECT DISTINCT Code_Qualite
    FROM ARTICLE AS a 
   WHERE a.Code_Famille IN (${families})
   AND a.Code_SousFamille IN (${subfamilies})
   AND a.Code_Gamme IN (${gammes})
   AND a.ZoneN5 <>0) AS a

  ON p.Code = a.Code_Qualite
  ORDER BY Libelle ASC`;
  const results = await fetchRequest(query);
  return results;
}
