import MSSQL from 'react-native-mssql';
import connect from './connect';

export default async function get_user(user) {
  try {
    const connection = await connect();

    user = "'" + user + "'";
    let query = `SELECT Nom, Code_Utilisateur, Code_Groupe FROM zz_Util WHERE Nom = ${user} `;
    const results = await MSSQL.executeQuery(query);
    return results;
  } catch (e) {
    throw Error(e);
  }
}
