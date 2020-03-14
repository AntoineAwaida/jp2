import {fetchRequest} from './fetch';

export default async function get_price(article, quantity) {
  let query = `SELECT PrixUnitaire FROM ARTICLE AS t JOIN TARIFarticlePrix AS x
  ON t.Code_Article = x.Code_Article WHERE t.Code_Article=${"'" +
    article.Code_Article +
    "'"}`;
  const results = await fetchRequest(query);

  const price = results[0].PrixUnitaire * quantity;

  return price;
}
