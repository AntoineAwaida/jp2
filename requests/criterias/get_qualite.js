import MSSQL from 'react-native-mssql';
import connect from '../connect';

export default async function get_qualite() {
  await connect();

  let query = `SELECT Code, Libelle FROM p_Qualite ORDER BY Libelle ASC`;
  const results = await MSSQL.executeQuery(query);
  return results;
}
