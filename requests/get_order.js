import MSSQL from 'react-native-mssql';
import connect from './connect';
import AsyncStorage from '@react-native-community/async-storage';

export default async function get_order(order) {
  await connect();

  let query = `SELECT a.Designation,p.Code_Article, p.PrixUnitaire, p.Quantite, i.ZoneN4, i.ZoneN5, c.RaisonSociale, i.status, i.DateCreation, i.MontantAcompte, i.id FROM ipad_COMMANDE AS i JOIN Client AS c ON i.Code_Client = c.Code_Client JOIN ipad_COMMANDEcomposition AS p ON i.id = p.Code_Commande JOIN article AS a ON p.Code_Article = a.Code_Article  WHERE i.id = ${order}`;
  const results = await MSSQL.executeQuery(query);

  return results;
}
