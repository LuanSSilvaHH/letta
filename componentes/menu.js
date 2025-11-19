import "../app/css/menu.css"

function Menu() {
    return (
        <nav>
            <div><p style={{ color: '#a7fe2a', fontSize: '5vh' }}>Vendedores e mais</p></div>
            <div>
            <a style={{ color: '#fe3b94', fontSize: '2.5vh' }}href='/'>Home</a>&nbsp;
            <a style={{ color: '#fe3b94', fontSize: '2.5vh' }}href='/clientes'>Clientes</a>&nbsp;
            <a style={{ color: '#fe3b94', fontSize: '2.5vh' }} href='/produtos'>Produtos</a>&nbsp;
            <a style={{ color: '#fe3b94', fontSize: '2.5vh' }} href='/vendedores'>Vendedores</a>  
            </div>    
        </nav>
    )
}

export default Menu