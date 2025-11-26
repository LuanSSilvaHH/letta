import "./css/home.css"

function Home (){
    return (
        <div className = 'div-main'>
            <img src="/logo.png" alt="logo" className="logo"/>
            <h1 style= {{color: '#fe3b94', textAlign: 'center'}}>Menu Principal</h1><br/>
            <p style={style}>sadsadada</p>
        </div>
    )
}

const style = {
    border:'0.5px solid blue',
    padding: '10px'
}

export default Home