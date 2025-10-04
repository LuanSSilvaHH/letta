import mysql from "./mysql.js"
import { DataTypes } from "sequelize"

// Localidade
const Localidade = mysql.define("Localidade", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cep: { type: DataTypes.STRING(9), allowNull: false },
    cidade: { type: DataTypes.STRING, allowNull: false },
    uf: { type: DataTypes.STRING(2), allowNull: false }, 
    bairro: { type: DataTypes.STRING, allowNull: false },
    rua: { type: DataTypes.STRING, allowNull: false },
    numero: { type: DataTypes.STRING, allowNull: false },
    complemento: DataTypes.STRING
});

// Cliente
const Cliente = mysql.define("Cliente", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    senha: { type: DataTypes.STRING, allowNull: false },
    telefone: DataTypes.STRING(15), 
    cpf: { type: DataTypes.STRING(14), unique: true }, 
    dataNascimento: DataTypes.DATEONLY,
    dadosBancarios: DataTypes.STRING,
});

// Vendedores
const Vendedor = mysql.define("Vendedor", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    senha: { type: DataTypes.STRING, allowNull: false },
    cnpj: { type: DataTypes.STRING(18), unique: true }, 
    dataCadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Categoria
const Categoria = mysql.define("Categoria", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false, unique: true },
    descricao: DataTypes.STRING,
    createdAt: { // Definido como um atributo
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: { // E o updatedAt também
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false // E desativamos a criação automática
});

// Produtos 
const Produto = mysql.define("Produto", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, 
    descricao: DataTypes.TEXT, 
    tamanho: DataTypes.STRING, 
    pesoKg: DataTypes.DECIMAL(6, 3), 
    alturaCm: DataTypes.DECIMAL(6, 2),
    larguraCm: DataTypes.DECIMAL(6, 2),
    profundidadeCm: DataTypes.DECIMAL(6, 2),
    nomeEditora: DataTypes.STRING, 
    qtdEstoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    imagemUrl: DataTypes.STRING
});

// Pedido 
const Pedido = mysql.define("Pedido", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    dataPedido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.ENUM('Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado'), defaultValue: 'Pendente' },
    descricao: DataTypes.TEXT,
    valorTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

// Item do Pedido
const ItemPedido = mysql.define("ItemPedido", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    qtd: { type: DataTypes.INTEGER, allowNull: false },
    valorUnitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    valorTotalItem: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

// Pagamento 
const Pagamento = mysql.define("Pagamento", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.ENUM('Pendente', 'Aprovado', 'Recusado', 'Estornado'), defaultValue: 'Pendente' },
    dataPagamento: DataTypes.DATE,
    transacaoId: DataTypes.STRING,
});

// Envio
const Envio = mysql.define("Envio", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    transportadora: { type: DataTypes.STRING, allowNull: false },
    codigoRastreio: DataTypes.STRING,
    dataEnvio: DataTypes.DATE,
    dataEntregaPrevista: DataTypes.DATE,
    dataEntregaReal: DataTypes.DATE,
    custoEnvio: { type: DataTypes.DECIMAL(8, 2), defaultValue: 0.00 },
});

// EnderecoCliente
const EnderecoCliente = mysql.define("EnderecoCliente", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tipo: { type: DataTypes.ENUM('Residencial', 'Comercial', 'Entrega'), allowNull: false },
    isPadrao: { type: DataTypes.BOOLEAN, defaultValue: false },
});


// --- RELACIONAMENTOS ---

Cliente.hasMany(EnderecoCliente, { foreignKey: 'ClienteId' });
EnderecoCliente.belongsTo(Cliente, { foreignKey: 'ClienteId' });

Localidade.hasMany(EnderecoCliente, { foreignKey: 'LocalidadeId' });
EnderecoCliente.belongsTo(Localidade, { foreignKey: 'LocalidadeId' });

Cliente.hasMany(Pedido, { foreignKey: 'ClienteId' });
Pedido.belongsTo(Cliente, { foreignKey: 'ClienteId' });

EnderecoCliente.hasMany(Pedido, { foreignKey: 'EnderecoEntregaId' });
Pedido.belongsTo(EnderecoCliente, { as: 'EnderecoEntrega', foreignKey: 'EnderecoEntregaId' });

Vendedor.hasMany(Produto, { foreignKey: 'VendedorId' });
Produto.belongsTo(Vendedor, { foreignKey: 'VendedorId' });

Localidade.hasMany(Vendedor, { foreignKey: 'LocalidadeId' });
Vendedor.belongsTo(Localidade, { foreignKey: 'LocalidadeId' });

Categoria.hasMany(Produto, { foreignKey: 'CategoriaId' });
Produto.belongsTo(Categoria, { foreignKey: 'CategoriaId' });

Produto.belongsToMany(Pedido, { through: ItemPedido, foreignKey: 'ProdutoId' });
Pedido.belongsToMany(Produto, { through: ItemPedido, foreignKey: 'PedidoId' });
ItemPedido.belongsTo(Produto, { foreignKey: 'ProdutoId' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'PedidoId' });

Pedido.hasOne(Pagamento, { foreignKey: 'PedidoId' });
Pagamento.belongsTo(Pedido, { foreignKey: 'PedidoId' });

Cliente.hasMany(Pagamento, { foreignKey: 'ClienteId' });
Pagamento.belongsTo(Cliente, { foreignKey: 'ClienteId' });

Pedido.hasOne(Envio, { foreignKey: 'PedidoId' });
Envio.belongsTo(Pedido, { foreignKey: 'PedidoId' });

EnderecoCliente.hasOne(Envio, { foreignKey: 'EnderecoId' });
Envio.belongsTo(EnderecoCliente, { foreignKey: 'EnderecoId' });

    mysql.sync({ force: false }) // Use `true` para recriar as tabelas
    .then(async () => {
        console.log('Modelos sincronizados com o banco de dados.');
        
        // Inserir as categorias iniciais
        await Categoria.bulkCreate([
            { nome: 'Vestidos', descricao: 'Variados modelos de vestidos para diferentes ocasiões.' },
            { nome: 'Blusas e Camisetas', descricao: 'Opções versáteis e estilosas para o dia a dia.' },
            { nome: 'Saias', descricao: 'Diversos estilos de saias, de casuais a elegantes.' },
            { nome: 'Calças e Jeans', descricao: 'Calças e jeans com diferentes cortes e lavagens.' },
            { nome: 'Casacos e Jaquetas', descricao: 'Peças para todas as estações e estilos.' },
            { nome: 'Moda Fitness', descricao: 'Roupas confortáveis e modernas para atividades físicas.' },
            { nome: 'Moda Praia', descricao: 'Biquínis, maiôs e saídas de praia.' },
            { nome: 'Bolsas', descricao: 'Bolsas de mão, ombro, carteiras e mochilas.' },
            { nome: 'Calçados', descricao: 'Tênis, sapatos, sandálias e chinelos.' },
            { nome: 'Bijuterias', descricao: 'Colares, brincos, anéis e pulseiras para complementar o look.' },
            { nome: 'Cintos e Lenços', descricao: 'Diversos modelos para dar um toque final às suas roupas.' },
            { nome: 'Chapéus e Bonés', descricao: 'Acessórios para todos os estilos e ocasiões.' },
        ], { ignoreDuplicates: false});

        console.log('Categorias iniciais inseridas.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar modelos ou inserir dados:', err);
    });


// Exporta os modelos
export {
    Cliente,
    Vendedor,
    Produto,
    Pedido,
    ItemPedido,
    Pagamento,
    Envio,
    Localidade,
    Categoria,
    EnderecoCliente
};