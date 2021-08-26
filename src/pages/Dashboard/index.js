import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { api } from "../../services/api";

function Dashboard() {

    const [clientes,setClientes] = useState ([])
    useEffect (()=>{
        api.get("/clientes").then(result=>{
            setClientes(result.data)
            
        }) 
    },[])
    return (
        <div style={{ display:"grid", gridAutoFlow:"column", justifyContent:"center"}}>
            <div>
            
            <br />
            <Card border="danger" style={{ width: '18rem', marginRight:"1rem" }}>
                <Card.Header style={{fontWeight:'bold',textAlign:'center'}}> Quantidade de Total de Clientes</Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign:'center'}}>
                        Atualmente possuimos { clientes.countTotal } clientes cadastrados em nosso sistema.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card border="danger" style={{ width: '18rem' }}>
                <Card.Header style={{fontWeight:'bold',textAlign:'center'}}> Quantidade de Clientes Lucro Presumido</Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign:'center'}}>
                    Atualmente possuimos { clientes.countPresumido } clientes do tipo Lucro Presumido.
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
            <div>
            <br />
            <Card border="danger" style={{ width: '18rem', marginRight:"1rem" }}>
                <Card.Header style={{fontWeight:'bold',textAlign:'center'}}> Registros de Clientes Cadastrados</Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign:'center'}}>
                    { clientes.countCadastrados } clientes se cadastraram no último mês.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card border="danger" style={{ width: '18rem' }}>
                <Card.Header style={{fontWeight:'bold',textAlign:'center'}}> Quantidade de Clientes Simples Nacional</Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign:'center'}}>
                        Atualmente possuimos { clientes.countSimples } clientes do tipo Simples Nacional.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            </div>
        </div>
    );
}

export default Dashboard;
