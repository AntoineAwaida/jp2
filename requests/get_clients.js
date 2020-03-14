import {fetchRequest} from './fetch';

export default async function get_clients(searchtext) {
  let query = `SELECT RaisonSociale,Code_Client,Telephone1,AdrFacturation1,solde FROM CLIENT AS c JOIN (SELECT SUM(CASE WHEN (Sens='C') THEN MontantDL ELSE MontantDL*(-1) END) AS solde, Code_Compte FROM MvtComptable GROUP BY Code_Compte) AS m ON c.Code_CompteClient = m.Code_Compte  WHERE c.RaisonSociale LIKE N'%${searchtext}%'`;

  const results = await fetchRequest(query);
  return results;
}
