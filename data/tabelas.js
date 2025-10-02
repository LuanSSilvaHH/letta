import mysql from "./mysql.js"
import {DataTypes} from "sequelize"

// Cliente
const Cliente = mysql.define("Cliente", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false },
  dadosBancarios: { type: DataTypes.STRING },
});

// Vendedores
const Vendedor = mysql.define("Vendedor", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  senha: DataTypes.STRING,
  dataCadastro: DataTypes.DATE,
});

// Produtos
const Produto = mysql.define("Produto", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descricao: DataTypes.STRING,
  tipo: DataTypes.STRING,
  nomeEditora: DataTypes.STRING,
  qtd: DataTypes.INTEGER,
});

// Pedido
const Pedido = mysql.define("Pedido", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  dataEnvio: DataTypes.DATE,
  descricao: DataTypes.STRING,
  valorTotal: DataTypes.FLOAT,
});

// Item do Pedido
const ItemPedido = mysql.define("ItemPedido", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  qtd: DataTypes.INTEGER,
});

// Pagamento
const Pagamento = mysql.define("Pagamento", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo: DataTypes.STRING,
  valor: DataTypes.FLOAT,
});

// Envio
const Envio = mysql.define("Envio", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  transportadora: DataTypes.STRING,
  dataEnvio: DataTypes.DATE,
  dataEntrega: DataTypes.DATE,
});

// Localidade
const Localidade = mysql.define("Localidade", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cidade: DataTypes.STRING,
  uf: DataTypes.STRING,
  bairro: DataTypes.STRING,
  rua: DataTypes.STRING,
  numero: DataTypes.STRING,
});

// Cliente -> Pedido
Cliente.hasMany(Pedido);
Pedido.belongsTo(Cliente);

// Vendedor -> Produto
Vendedor.hasMany(Produto);
Produto.belongsTo(Vendedor);

// Produto <-> Pedido (N:N via ItemPedido)
Produto.belongsToMany(Pedido, { through: ItemPedido });
Pedido.belongsToMany(Produto, { through: ItemPedido });

// Pedido -> Pagamento
Pedido.hasOne(Pagamento);
Pagamento.belongsTo(Pedido);

// Pedido -> Envio
Pedido.hasOne(Envio);
Envio.belongsTo(Pedido);

// Pedido -> Localidade
Localidade.hasMany(Pedido);
Pedido.belongsTo(Localidade);

mysql.sync()

export {Cliente,Vendedor,Produto,Pedido,ItemPedido,Pagamento,Envio,Localidade};