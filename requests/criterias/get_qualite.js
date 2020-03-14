import AsyncStorage from '@react-native-community/async-storage';
import {fetchRequest} from '../fetch';

export default async function get_qualite() {
  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);

  let query = `SELECT Code, Libelle FROM p_Qualite AS p JOIN (SELECT DISTINCT a.Code_Qualite
    FROM ARTICLE AS a 
    JOIN zz_UtilGamme AS u ON a.Code_Famille = u.Code_Gamme
    
    WHERE u.Code_Utilisateur = ${"'" + user.Code_Utilisateur + "'"}) AS a
  ON p.Code = a.Code_Qualite
  ORDER BY Libelle ASC`;
  const results = await fetchRequest(query);
  return results;
}
