import { Cliente } from "../../data/tabelas.js" // O caminho pode variar dependendo da estrutura do seu projeto
import ".././css/listagem.css"



async function removeClientes(formData){
    'use server'
    const id = formData.get('id')
    const clientes =await Cliente.findByPk(id)
    await clientes.destroy()
    redirect('/clientes')
}
async function Clientes(){
    const clientes = await Cliente.findAll()
    
    return (
        <div>
            
        <h1>Lista de Clientes</h1> <br/>
        <a href='/clientes/cadastrar'> cadastrar um cliente</a>
        <table border = '1'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>CPF</th>
                    <th>Nascimento</th> 
                    <th>Dados Bancarios</th>
                    <th>Senha</th>
                </tr>
            </thead>
            <tbody>
                {
                    clientes.map(function(clien) {
                        return (
                            <tr key={clien.id}>
                                <td>{clien.id}</td>
                                <td>{clien.nome}</td>
                                <td>{clien.email}</td>
                                <td>{clien.telefone}</td>
                                <td>{clien.cpf}</td> 
                                <td>{clien.dataNascimento ? new Date(clien.dataNascimento).toLocaleDateString('pt-BR') : ''}</td>
                                <td>{clien.dadosBancarios}</td>
                                <td>{clien.senha}</td>
                                <td> 
                                        <form action = {removeClientes}>
                                        <input type='hidden' name='id' value={clien.id}/>
                                        <button>&#10006;</button> 
                                    </form>
                                        <form action = '/produtos/editar'>
                                        <input type="hidden" name="id" value={clien.id}/>
                                        <button>&#9998;</button></form>
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
export default Clientes