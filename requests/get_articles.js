import MSSQL from 'react-native-mssql';
import connect from './connect';

export default async function get_articles() {
  await connect();
  let query = `SELECT TOP 100 * FROM article`;
  const results = await MSSQL.executeQuery(query);
  return results;
}
