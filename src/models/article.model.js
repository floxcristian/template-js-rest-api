const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('debug', true);
const ArticuloSchema = new Schema({
  sku: String,
  nombre: String,
  descripcion: String,
  imagen: String,
  precio: Number,
  largoNombre: Number,
  largoDescripcion: Number,
  peso: Number,
  estado: String,
  visible: Number,
  categoria: String,
  p_minimo: String,
  marca: String,
  precios: {
    type: Schema.Types.Mixed
  },
  images: {
    type: Schema.Types.Mixed
  }
});

module.exports = mongoose.model('articulos', ArticuloSchema);
