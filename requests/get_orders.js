import MSSQL from 'react-native-mssql';
import connect from './connect';
import AsyncStorage from '@react-native-community/async-storage';

export default async function get_orders() {
  await connect();
  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);

  let query = `SELECT c.RaisonSociale, i.status, i.DateCreation, i.MontantAcompte, i.id FROM ipad_COMMANDE AS i JOIN Client AS c ON i.Code_Client = c.Code_Client WHERE Code_Util = ${"'" +
    user.Code_Utilisateur +
    "'"}`;
  const results = await MSSQL.executeQuery(query);

  return results;
}
