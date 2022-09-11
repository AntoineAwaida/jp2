import {fetchRequest} from './fetch';
import AsyncStorage from '@react-native-community/async-storage';

export default async function get_clients(searchtext) {
  let config = await AsyncStorage.getItem('credentials');
  config = await JSON.parse(config);
  depot = config.depot;

  let query;

  if (depot.substring(1, 2) == '1') {
    query = `SELECT RaisonSociale,Code_Client,Telephone1,AdrFacturation1,solde FROM CLIENT AS c JOIN (SELECT SUM(CASE WHEN (Sens='C') THEN MontantDL ELSE MontantDL*(-1) END) AS solde, Code_Compte FROM MvtComptable GROUP BY Code_Compte) AS m ON c.Code_CompteClient = m.Code_Compte  WHERE c.RaisonSociale LIKE N'%${searchtext}%' OR c.Code_Client=${"'" +
      searchtext +
      "'"}`;
  } else {
    query = `SELECT RaisonSociale,Code_Client,Telephone1,AdrFacturation1,solde FROM CLIENT AS c JOIN (SELECT SUM(CASE WHEN (Sens='C') THEN MontantDL ELSE MontantDL*(-1) END) AS solde, Code_Compte FROM MvtComptableBEN GROUP BY Code_Compte) AS m ON c.Code_CompteClient = m.Code_Compte  WHERE c.RaisonSociale LIKE N'%${searchtext}%' OR c.Code_Client=${"'" +
      searchtext +
      "'"}`;
  }

  const results = await fetchRequest(query);
  return results;
}
