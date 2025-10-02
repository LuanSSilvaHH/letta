import { Cliente } from "../../data/tabelas.js"

async function Clientes(){
    const clientes = await Cliente.findAll()
    
    return (
        <div>
            
        <h1>Lista de filmes</h1> <br/>
        <a href='/clientes/cadastrar'> Criar um filme</a>
        <table border = '1'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Senha</th>
                    <th>Dados Bancarios</th>
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
                                <td>{clien.senha}</td>
                                <td>{clien.dadosBancarios}</td>
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