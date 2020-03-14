import AsyncStorage from '@react-native-community/async-storage';
import {fetchRequest} from './fetch';

export default async function get_orders(status, dates) {
  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);

  const statusrequested =
    status.length > 0
      ? '(' +
        status
          .map(function(a) {
            return "'" + a.replace("'", "''") + "'";
          })
          .join() +
        ')'
      : null;

  let query = `SELECT c.RaisonSociale, i.status, i.DateCreation, i.MontantAcompte, i.id FROM ipad_COMMANDE AS i JOIN Client AS c ON i.Code_Client = c.Code_Client WHERE Code_Util = ${"'" +
    user.Code_Utilisateur +
    "'"} AND i.DateCreation BETWEEN ${"'" + dates[0] + "'"} AND ${"'" +
    dates[1] +
    "'"}`;

  if (statusrequested) {
    query = query + `AND i.status IN ${statusrequested}`;
  }
  query += `ORDER BY i.DateCreation DESC`;

  const results = await fetchRequest(query);

  return results;
}
