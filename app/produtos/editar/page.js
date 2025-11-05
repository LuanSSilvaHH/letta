import { redirect } from "next/navigation";
import { Produto, Categoria, Vendedor  } from "../../../data/tabelas";
import Produtos from "../page";

    async function editaProduto(formData) {
        'use server'
        const id = formData.get('id')
        const nome = formData.get('nome')
        const tamanho = formData.get('tamanho')
        const valor = formData.get('valor')
        const descricao = formData.get('descricao')
        const vendedorId = formData.get('vendedorId')
        const categoriaId = formData.get('categoriaId')
        const qtdEstoque = formData.get('qtdEstoque')
        const produto = await Produto.findByPk(id)
        
        produto.nome = nome
        produto.tamanho = tamanho
        produto.valor = valor
        produto.descricao = descricao
        produto.VendedorId = vendedorId
        produto.CategoriaId = categoriaId
        produto.qtdEstoque = qtdEstoque
        
        await produto.save()
        redirect('/produtos')
    }

async function TelaProduto({searchParams}) {

    const id = searchParams.id
    const produto = await Produto.findByPk(id)
    const vendedor = await Vendedor.findByPk(produto.VendedorId)
    const categoria = await Categoria.findByPk(produto.CategoriaId)
    // Busca a lista de vendedores e categorias para preencher os selects
    const vendedores = await Vendedor.findAll();
    const categorias = await Categoria.findAll();

    return (
        <div>
            <form action={editaProduto}>

            <input type="hidden" name="id" defaultValue={produto.id}/>

                <label htmlFor='nome'>Nome:</label><br />
                <input type='text' name='nome' defaultValue={produto.nome} required /><br />

                <label htmlFor='tamanho'>Tamanho:</label><br />
                <input type='text' name='tamanho' defaultValue={produto.tamanho}/><br />

                <label htmlFor='valor'>Valor:</label><br />
                <input type='number' name='valor' step='0.01' defaultValue={produto.valor} required /><br />

                <label htmlFor='descricao'>Descrição:</label><br />
                <textarea name='descricao' defaultValue={produto.descricao}></textarea><br />

                {/* Campo de seleção para Vendedor */}
                <label htmlFor='vendedorId'>Vendedor:</label><br />
                <select name='vendedorId' defaultValue={vendedor.nome}required>
                    {vendedores.map(vendedor => (
                        <option key={vendedor.id} value={vendedor.id}>
                            {vendedor.nome}
                        </option>
                    ))}
                </select><br />

                {/* Campo de seleção para Categoria */}
                <label htmlFor='categoriaId'>Categoria:</label><br />
                <select name='categoriaId' defaultValue={categoria.id}required>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select><br />

                {/* Campo para a quantidade em estoque */}
                <label htmlFor='qtdEstoque'>Quantidade em Estoque:</label><br />
                <input type='number' name='qtdEstoque' defaultValue={produto.qtdEstoque}required /><br />

                <button>Salvar</button>
            </form>
        </div>
    );
}
export default TelaProduto;