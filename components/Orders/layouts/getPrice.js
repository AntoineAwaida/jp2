export default function getPrice(articles) {
  let total_price = 0;
  articles.map(article => {
    total_price += article.price;
  });
  return Math.round(total_price * 100) / 100;
}
