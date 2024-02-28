export function createFavoritesValues(favorites_data: any, user_id: number) {
  const values = [];
  favorites_data.map((item) => {
    values.push({
      product_id: item.product.id,
      user_id,
      quantity: item.quantity
    });
  });

  return values;
}
