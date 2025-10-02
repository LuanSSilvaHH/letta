
import {Cliente} from '../../../data/tabelas'
import {redirect} from 'next/navigation'

async function insereCliente(formData){
    'use server'
    const dados = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        senha: formData.get('senha'),
        dadosBancarios: formData.get('dadosBancarios')
    }
   await Cliente.create(dados)
   redirect('/clientes')
}

function TelaCliente(){
    return(
        <>
        <form action={insereCliente}>
             <label htmlfor='nome'>Nome:</label><br/>
            <input type='text' name='nome'/> <br/>

            <label htmlfor='email'>Email:</label><br/>
            <input type='text' name='email'/> <br/>

            <label htmlfor='senha'>senha</label><br/>
            <input type='text' name='senha'/> <br/>

            <label htmlfor='dadosBancarios'>Dados Bancarios:</label><br/>
            <input type='text' name='dadosBancarios'/> <br/>

            <button>Cadastrar</button>
        </form>
        </>
    )
}

export default TelaCliente