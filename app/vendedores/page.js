import { Vendedor } from "../../data/tabelas";

// Força a renderização dinâmica da página para sempre buscar os dados mais recentes.
export const dynamic = 'force-dynamic';

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