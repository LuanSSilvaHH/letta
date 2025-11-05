import { Vendedor } from "../../data/tabelas";
import { redirect } from "next/navigation";


// Força a renderização dinâmica da página para sempre buscar os dados mais recentes.
async function removeVendedor(formData){
        'use server'
        const id = formData.get('id')
        const vendedor =await Vendedor.findByPk(id)
        await vendedor.destroy()
        redirect('/vendedores')
}

async function Vendedores(){
    const vendedores = await Vendedor.findAll()
    return (
        <div>
            <h1>Lista de Vendedores</h1> <br/>
            <a href="/vendedores/cadastrar">Cadastrar Vendedor</a> <br/><br/>

        <table border = '1'>    
                <thead>
                    <tr>
                    <th>ID:</th>
                    <th>Nome:</th>
                    <th>Email:</th>
                    <th>Senha:</th>
                    <th>CNPJ:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vendedores.map(function(vend){
                            return (
                                <tr key={vend.id}>
                                <td>{vend.id}</td>
                                <td>{vend.nome}</td>
                                <td>{vend.email}</td>
                                <td>{vend.senha}</td>
                                <td>{vend.cnpj}</td>
                                <td> <form action = {removeVendedor}>
                                    <input type='hidden' name='id' value={vend.id}/>
                                    <button>Excluir</button> 
                                </form>
                                </td>
                                <td>
                                    <form action = '/vendedores/editar'>
                                    <input type="hidden" name="id" value={vend.id}/>
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
export default Vendedores