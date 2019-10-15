import MSSQL from 'react-native-mssql';
import connect from '../connect';

export default async function get_sousfamille() {
  await connect();

  let query = `SELECT Code, Libelle FROM p_SousFamille ORDER BY Libelle ASC`;
  const results = await MSSQL.executeQuery(query);
  return results;
}
