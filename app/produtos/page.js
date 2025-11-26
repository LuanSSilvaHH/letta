import { Produto, Vendedor, Categoria } from "../../data/tabelas"
import { redirect } from "next/navigation";
import ".././css/listagem.css"

    async function removeProduto(formData){
    'use server'
    const id = formData.get('id')
    const produto =await Produto.findByPk(id)
    await produto.destroy()
    redirect('/vendedores')
}

async function Produtos(){
    const produtos = await Produto.findAll({
        include: [
            { model: Vendedor }, // Inclui os dados do vendedor associado
            { model: Categoria } // Inclui os dados da categoria associada
        ]
    })

    return (
        <div>
            <h1>Lista de Produtos</h1> <br/>
            <a href='/produtos/cadastrar'> Criar um produto</a>
            <table>    
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Tamanho</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                        <th>Vendedor</th> 
                        <th>Categoria</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produtos.map(function(prod){
                            return (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.nome}</td>
                                    <td>{prod.tamanho}</td>
                                    <td>{prod.valor}</td>
                                    <td>{prod.descricao}</td>
                                    {/* Acessa o nome do vendedor a partir do objeto incluído */}
                                    <td>{prod.Vendedor ? prod.Vendedor.nome : ''}</td>
                                    {/* Acessa o nome da categoria a partir do objeto incluído */}
                                    <td>{prod.Categorium ? prod.Categorium.nome : ''}</td>
                                    <td>{prod.qtdEstoque}</td>
                                    <td> 
                                        <form action = {removeProduto}>
                                        <input type='hidden' name='id' value={prod.id}/>
                                        <button>Excluir</button> 
                                    </form>
                                        <form action = '/produtos/editar'>
                                        <input type="hidden" name="id" value={prod.id}/>
                                        <button>Editar</button></form>
                                    
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Produtos