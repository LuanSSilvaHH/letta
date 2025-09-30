import { Filme } from "../../data/tabelas"

async function Filmes(){
    const filmes = await Filme.findAll()
    
    return (
        <div>
            
        <h1>Lista de filmes</h1> <br/>
        <a href='/filmes/novo'> Criar um filme</a>
        <table border = '1'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Titulo</th>
                    <th>Descricao</th>
                    <th>Ano</th>
                </tr>
            </thead>
            <tbody>
                {
                    filmes.map(function(fil) {
                        return (
                            <tr key={fil.id}>
                                <td>{fil.id}</td>
                                <td>{fil.titulo}</td>
                                <td>{fil.descricao}</td>
                                <td>{fil.ano}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
    )
}
export default Filmes