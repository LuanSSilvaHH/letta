import { Cliente, EnderecoCliente, Localidade } from '../../../data/tabelas' // Importe EnderecoCliente e Localidade
import { redirect } from 'next/navigation'
import "../../css/cadastro.css"

async function CadastroCliente(formData) {
    'use server'

    // Dados do Cliente
    const dadosCliente = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        senha: formData.get('senha'),
        telefone: formData.get('telefone'),
        cpf: formData.get('cpf'),
        dataNascimento: formData.get('dataNascimento'),
        dadosBancarios: formData.get('dadosBancarios')
    }

    const dadosLocalidade = {
        cep: formData.get('cep'),
        cidade: formData.get('cidade'),
        uf: formData.get('uf'),
        bairro: formData.get('bairro'),
        rua: formData.get('rua'),
        numero: formData.get('numero'),
        complemento: formData.get('complemento')
    }

    try {
        const novaLocalidade = await Localidade.create(dadosLocalidade)
        const novoCliente = await Cliente.create(dadosCliente)
        await EnderecoCliente.create({
            tipo: 'Residencial',
            isPadrao: true,
            ClienteId: novoCliente.id,
            LocalidadeId: novaLocalidade.id
        })
        redirect('/clientes')
    } catch (error) {
        console.error("Erro ao cadastrar cliente e endereço:", error)
        console.log("Dados do Cliente:", dadosCliente)
        console.log("Dados da Localidade:", dadosLocalidade)
        throw error
    }
}

function TelaCliente() {
    return (
        <>
            <form action={CadastroCliente}>
                <h2>Cadastro de Cliente</h2>

                <label htmlFor='nome'>Nome:</label><br />
                <input type='text' name='nome' required /><br />

                <label htmlFor='email'>Email:</label><br />
                <input type='email' name='email' required /><br />

                <label htmlFor='senha'>Senha:</label><br />
                <input type='password' name='senha' required /><br /> 

                <label htmlFor='telefone'>Telefone:</label><br />
                <input type='tel' name='telefone' placeholder="(XX) XXXXX-XXXX" /><br />
                <label htmlFor='cpf'>CPF:</label><br />
                <input type='text' name='cpf' placeholder="XXX.XXX.XXX-XX" /><br />

                <label htmlFor='dataNascimento'>Data de Nascimento:</label><br />
                <input type='date' name='dataNascimento' /><br />

                <label htmlFor='dadosBancarios'>Dados Bancários:</label><br />
                <input type='text' name='dadosBancarios' /><br />

                <h3>Endereço Principal</h3>
                <label htmlFor='cep'>CEP:</label><br />
                <input type='text' name='cep' required /><br />

                <label htmlFor='cidade'>Cidade:</label><br />
                <input type='text' name='cidade' required /><br />

                <label htmlFor='uf'>UF:</label><br />
                <input type='text' name='uf' maxLength="2" required /><br />

                <label htmlFor='bairro'>Bairro:</label><br />
                <input type='text' name='bairro' required /><br />

                <label htmlFor='rua'>Rua:</label><br />
                <input type='text' name='rua' required /><br />

                <label htmlFor='numero'>Número:</label><br />
                <input type='text' name='numero' required /><br />

                <label htmlFor='complemento'>Complemento:</label><br />
                <input type='text' name='complemento' /><br />

                <br />
                <button type='submit'>Cadastrar Cliente</button>
            </form>
        </>
    )
}

export default TelaCliente