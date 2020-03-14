import AsyncStorage from '@react-native-community/async-storage';
import {fetchRequest} from '../fetch';

export default async function get_family() {
  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);

  let query = `SELECT Code, Libelle FROM p_Famille WHERE Code IN ( SELECT CODE_GAMME FROM zz_UtilGamme WHERE Code_Utilisateur= ${"'" +
    user.Code_Utilisateur +
    "'"}) ORDER BY Libelle ASC`;
  const results = await fetchRequest(query);
  return results;
}
