import MSSQL from 'react-native-mssql';
import connect from './connect';

export default async function get_clients(searchtext) {
  await connect();
  let query = `SELECT * FROM CLIENT AS c JOIN (SELECT SUM(CASE WHEN (Sens='C') THEN MontantDL ELSE MontantDL*(-1) END) AS solde, Code_Compte FROM MvtComptable GROUP BY Code_Compte) AS m ON c.Code_CompteClient = m.Code_Compte  WHERE c.RaisonSociale LIKE N'%${searchtext}%'`;

  const results = await MSSQL.executeQuery(query);
  return results;
}
