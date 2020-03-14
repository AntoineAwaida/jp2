import {fetchRequest} from './fetch';

export default async function get_user(user) {
  try {
    user = "'" + user + "'";
    let query = `SELECT Nom, Code_Utilisateur, Code_Groupe FROM zz_Util WHERE Code_Utilisateur = ${user} `;
    const results = await fetchRequest(query);

    return results;
  } catch (e) {
    throw Error(e);
  }
}
