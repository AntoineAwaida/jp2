import {fetchRequest} from './fetch';

export default async function get_order(order) {
  let query = `SELECT a.Designation,p.Code_Article, p.PrixUnitaire, p.Quantite,p.QuantiteInitiale, i.ZoneN4, i.ZoneN5, c.RaisonSociale, i.status, p.status AS statusArticle, i.DateCreation, i.MontantAcompte, i.id FROM ipad_COMMANDE AS i JOIN Client AS c ON i.Code_Client = c.Code_Client JOIN ipad_COMMANDEcomposition AS p ON i.id = p.Code_Commande JOIN article AS a ON p.Code_Article = a.Code_Article  WHERE i.id = ${order}`;
  const results = await fetchRequest(query);

  return results;
}
