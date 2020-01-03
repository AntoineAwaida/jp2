import MSSQL from 'react-native-mssql';
import connect from './connect';

export default async function get_solde(client) {
  await connect();
  let query = `SELECT  SUM(CASE WHEN (Sens='C') THEN MontantDL ELSE MontantDL*(-1) END)
    FROM [DataXV].[dbo].[MvtComptable]
    WHERE MvtComptable.Code_Compte = ${client}
    GROUP BY Code_Compte`;
  const results = await MSSQL.executeQuery(query);
  return results;
}
