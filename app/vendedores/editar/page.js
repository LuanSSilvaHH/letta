import { redirect } from "next/navigation"
import { Localidade, Vendedor } from "../../../data/tabelas"

async function editaVendedor(formData){
    'use server'
    //vendedor
    const id = formData.get('id')
    const nome = formData.get('nome')
    const email = formData.get('email')
    const senha = formData.get('senha')
    const cnpj = formData.get('cnpj')

    //localidade
    const cep = formData.get('cep')
    const cidade = formData.get('cidade')
    const uf = formData.get('uf')
    const bairro = formData.get('bairro')
    const rua = formData.get('rua')
    const numero = formData.get('numero')
    const complemento = formData.get('complemento')

    const vendedor = await Vendedor.findByPk(id)
    const localidade = await Localidade.findByPk(vendedor.LocalidadeId)
    

    vendedor.nome = nome
    vendedor.email = email
    vendedor.senha = senha
    vendedor.cnpj = cnpj

    await vendedor.save()
    redirect('/vendedores')
}

export default async function telaEditarVendedor({ searchParams }){
    const id = searchParams.id //teste, usar um id existente
    const vendedor = await Vendedor.findByPk(id)
    const localidade = await Localidade.findByPk(vendedor.LocalidadeId)
    
    return(
        <div>
            <form action={editaVendedor}>
                <h2>Editar Vendedores</h2>

               <input type="hidden" name="id" defaultValue={vendedor.id}/>

                <label htmlFor='nome'>Nome:</label><br />
                <input type='text' name='nome' defaultValue={vendedor.nome} required /><br />

                <label htmlFor='email'>Email:</label><br />
                <input type='email' name='email' defaultValue={vendedor.email} required /><br />

                <label htmlFor='senha'>Senha:</label><br />
                <input type='password' name='senha' defaultValue={vendedor.senha} required /><br />

                <label htmlFor='cnpj'>CNPJ/CPF:</label><br />
                <input type='text' name='cnpj' placeholder="XX.XXX.XXX/0001-XX" defaultValue={vendedor.cnpj} /><br />

                <h3>Endereço</h3>
                <label htmlFor='cep'>CEP:</label><br />
                <input type='text' name='cep' placeholder="XXXXX-XXX" defaultValue={localidade.cep} required /><br />
                <label htmlFor='cidade'>Cidade:</label><br />
                <input type='text' name='cidade' defaultValue={localidade.cidade} required /><br />
                <label htmlFor='uf'>UF:</label><br />
                <input type='text' name='uf' placeholder="XX" defaultValue={localidade.uf} required /><br />
                <label htmlFor='bairro'>Bairro:</label><br />
                <input type='text' name='bairro' defaultValue={localidade.bairro} required /><br />
                <label htmlFor='rua'>Rua:</label><br />
                <input type='text' name='rua' defaultValue={localidade.rua} required /><br />
                <label htmlFor='numero'>Número:</label><br />
                <input type='text' name='numero' defaultValue={localidade.numero}  required /><br />
                <label htmlFor='complemento'>Complemento:</label><br />
                <input type='text' name='complemento' defaultValue={localidade.complemento} /><br />

                <button type='submit'>Salvar</button>
            </form>
        </div>
    );
}
