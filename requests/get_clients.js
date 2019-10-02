import MSSQL from 'react-native-mssql';
import connect from './connect';

export default async function get_clients(searchtext) {
  await connect();
  let query = `SELECT * FROM CLIENT WHERE RaisonSociale LIKE '%${searchtext}%'`;
  const results = await MSSQL.executeQuery(query);
  return results;
}
