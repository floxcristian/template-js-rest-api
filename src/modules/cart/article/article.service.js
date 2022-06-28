/**
 * Obtener todas las marcas de la colección de artículos.
 * @params visible
 * @return
 */
const getBrands = visible => {
  const filters = [{ marca: { $ne: null } }];
  if (visible) filters.push({ visible: 1 });
  return Articulo.distinct('marca', { $and: filters });
};

/**
 * Obtener todos los skus de la colección de articulos.
 * @params search, visible
 * @return
 */
const getSkus = async (search, visible) => {
  if (!search) return [];

  const filters = [];
  if (visible) filters.push({ visible: 1 });

  if (search.includes(',')) {
    filters.push({ sku: { $in: search.split(',') } });
    return Articulo.aggregate([{ $match: { $and: filters } }, { $group: { _id: '$sku' } }]);
  } else {
    const searchFilter = new RegExp(search || '', 'i');
    filters.push({ sku: searchFilter });
    return Articulo.aggregate([{ $match: { $and: filters } }, { $group: { _id: '$sku' } }, { $limit: 10 }]);
  }
};

module.exports.articleService = { getSkus, getBrands };
