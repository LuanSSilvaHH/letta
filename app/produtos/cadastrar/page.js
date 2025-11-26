import { redirect } from 'next/navigation';
import { Produto, Vendedor, Categoria } from '../../../data/tabelas';
import "../../css/cadastro.css"

async function insereProduto(formData) {
    'use server';

    const dados = {
        nome: formData.get('nome'),
        tamanho: formData.get('tamanho'),
        valor: parseFloat(formData.get('valor')), // Converte para número
        descricao: formData.get('descricao'),
        VendedorId: parseInt(formData.get('vendedorId')), // Converte para inteiro
        CategoriaId: parseInt(formData.get('categoriaId')), // Converte para inteiro
        qtdEstoque: parseInt(formData.get('qtdEstoque')) // Converte para inteiro e renomeia
    };

    try {
        await Produto.create(dados);
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        // Em um cenário real, você deve lidar com o erro de forma mais robusta
        // (por exemplo, exibir uma mensagem de erro na interface).
    }

    redirect('/produtos');
}

// Componente para a tela de cadastro
async function TelaProduto() {
    // Busca a lista de vendedores e categorias para preencher os selects
    const vendedores = await Vendedor.findAll();
    const categorias = await Categoria.findAll();

    return (
        <div>
            <form action={insereProduto}>
                <label htmlFor='nome'>Nome:</label><br />
                <input type='text' name='nome' required /><br />

                <label htmlFor='tamanho'>Tamanho:</label><br />
                <input type='text' name='tamanho' /><br />

                <label htmlFor='valor'>Valor:</label><br />
                <input type='number' name='valor' step='0.01' required /><br />

                <label htmlFor='descricao'>Descrição:</label><br />
                <textarea name='descricao'></textarea><br />

                {/* Campo de seleção para Vendedor */}
                <label htmlFor='vendedorId'>Vendedor:</label><br />
                <select name='vendedorId' required>
                    {vendedores.map(vendedor => (
                        <option key={vendedor.id} value={vendedor.id}>
                            {vendedor.nome}
                        </option>
                    ))}
                </select><br />

                {/* Campo de seleção para Categoria */}
                <label htmlFor='categoriaId'>Categoria:</label><br />
                <select name='categoriaId' required>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select><br />

                {/* Campo para a quantidade em estoque */}
                <label htmlFor='qtdEstoque'>Quantidade em Estoque:</label><br />
                <input type='number' name='qtdEstoque' required /><br />

                <button>Cadastrar</button>
            </form>
        </div>
    );
}
export default TelaProduto;