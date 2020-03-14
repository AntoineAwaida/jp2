import {fetchRequest} from './fetch';

export default async function get_solde(client) {
  let query = `SELECT  SUM(CASE WHEN (Sens='C') THEN MontantDL ELSE MontantDL*(-1) END)
    FROM [DataXV].[dbo].[MvtComptable]
    WHERE MvtComptable.Code_Compte = ${client}
    GROUP BY Code_Compte`;
  const results = await fetchRequest(query);
  return results;
}
