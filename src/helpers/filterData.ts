export function filterData(values: any, data: any) {
  const existedItems = values.filter((item) =>
    data.some((obj2) => item.product_id === obj2.product_id)
  );

  const newItems = values.filter(
    (item) => !data.some((obj2) => item.product_id == obj2.product_id)
  );

  return {
    existedItems,
    newItems
  };
}
