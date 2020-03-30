import AsyncStorage from '@react-native-community/async-storage';
import {fetchRequest} from '../fetch';
import getRequestString from './getRequestString';

export default async function get_gamme(criteria) {
  const familiesSelected = criteria.famille.map(e => e.Code);
  const subfamiliesSelected = criteria.sous_famille.map(e => e.Code);
  let families = getRequestString(familiesSelected);
  let subfamilies = getRequestString(subfamiliesSelected);

  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);

  let query = `SELECT Code, Libelle FROM p_Gamme AS p JOIN (SELECT DISTINCT Code_Gamme
    FROM ARTICLE AS a 
   WHERE a.Code_Famille IN (${families})
   AND a.Code_SousFamille IN (${subfamilies})
   AND a.ZoneN5 <>0) AS a


  ON p.Code = a.Code_Gamme
  ORDER BY Libelle ASC`;
  const results = await fetchRequest(query);
  return results;
}
