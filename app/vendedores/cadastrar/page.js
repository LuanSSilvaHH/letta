import { Vendedor, Localidade } from "../../../data/tabelas";
import { redirect } from 'next/navigation';
// Não é mais necessário importar 'revalidatePath' com a abordagem 'force-dynamic'.

async function CadastroVendedor(formData){
    'use server';
    const dadosVendedor = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        senha: formData.get('senha'),
        cnpj: formData.get('cnpj')
    };

    const dadosLocalidade = {
        cep: formData.get('cep'),
        cidade: formData.get('cidade'),
        uf: formData.get('uf'),
        bairro: formData.get('bairro'),
        rua: formData.get('rua'),
        numero: formData.get('numero'),
        complemento: formData.get('complemento')
    };

    try {
        const novaLocalidade = await Localidade.create(dadosLocalidade);
        await Vendedor.create({
            ...dadosVendedor,
            LocalidadeId: novaLocalidade.id
        });
    } catch (error) {
        console.error("Erro ao cadastrar vendedor:", error);
        // Em um cenário real, você exibiria uma mensagem de erro na UI.
        // Por agora, o erro será exibido no terminal.
    }
    
    // O redirecionamento acionará a página de listagem, que não está em cache.
    redirect('/vendedores');
}

export default function telaVendedor(){
    return(
        <div>
            <form action={CadastroVendedor}>
                <h2>Cadastro de Vendedor</h2>

                <label htmlFor='nome'>Nome:</label><br />
                <input type='text' name='nome' required /><br />

                <label htmlFor='email'>Email:</label><br />
                <input type='email' name='email' required /><br />

                <label htmlFor='senha'>Senha:</label><br />
                <input type='password' name='senha' required /><br />

                <label htmlFor='cnpj'>CNPJ/CPF:</label><br />
                <input type='text' name='cnpj' placeholder="XX.XXX.XXX/0001-XX" /><br />

                <h3>Endereço</h3>
                <label htmlFor='cep'>CEP:</label><br />
                <input type='text' name='cep' placeholder="XXXXX-XXX" required /><br />
                <label htmlFor='cidade'>Cidade:</label><br />
                <input type='text' name='cidade' required /><br />
                <label htmlFor='uf'>UF:</label><br />
                <input type='text' name='uf' placeholder="XX" required /><br />
                <label htmlFor='bairro'>Bairro:</label><br />
                <input type='text' name='bairro' required /><br />
                <label htmlFor='rua'>Rua:</label><br />
                <input type='text' name='rua' required /><br />
                <label htmlFor='numero'>Número:</label><br />
                <input type='text' name='numero' required /><br />
                <label htmlFor='complemento'>Complemento:</label><br />
                <input type='text' name='complemento' /><br />

                <button type='submit'>Cadastrar Vendedor</button>
            </form>
        </div>
    );
}