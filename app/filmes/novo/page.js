
import {Filme} from '../../../data/tabelas'
import {redirect} from 'next/navigation'

async function insereFilme(formData){
    'use server'
    const dados = {
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        ano: formData.get('ano')
    }
   await Filme.create(dados)
   redirect('/filmes')
}

function TelaNovaFilme(){
    return(
        <>
        <form action={insereFilme}>
             <label htmlfor='titulo'>Titulo</label><br/>
            <input type='text' name='titulo'/> <br/>

            <label htmlfor='descricao'>Descricao</label><br/>
            <input type='text' name='descricao'/> <br/>

            <label htmlfor='ano'>Ano</label><br/>
            <input type='text' name='ano'/> <br/>

            <button>Cadastrar</button>
        </form>
        </>
    )
}

export default TelaNovaFilme