import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { api } from "../../services/api";

function Dashboard() {

    const [clientes,setClientes] = useState ([])
    const [anterior,setAnterior] = useState ({})
    useEffect (()=>{
        api.get("/clientes/dashboard").then(result=>{
            setClientes(result.data)
            
        }) 
        api.get("/clientes/dataAnterior").then(result=>{
            setAnterior(result.data)
            
        }) 
    },[])

    return (
        <div style={{ display:"grid", gridAutoFlow:"column", justifyContent:"center"}}>
            <div>
            
            <br />
            <Card border="primary" style={{ width: '18rem', marginRight:"1rem" }}>
                <Card.Header style={{fontWeight:'bold',textAlign:'center'}}> Quantidade de Total de Clientes</Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign:'center'}}>
                        Atualmente possuimos { clientes.tamClientes } clientes cadastrados em nosso sistema.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card border="warning" style={{ width: '18rem' }}>
                <Card.Header style={{fontWeight:'bold',textAlign:'center'}}> Quantidade de Clientes Lucro Presumido</Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign:'center'}}>
                    Atualmente possuimos { clientes.tamClientesPresumido } clientes do tipo Lucro Presumido.
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
            <div>
            <br />
            <Card border="danger" style={{ width: '18rem', marginRight:"1rem" }}>
                <Card.Header style={{fontWeight:'bold',textAlign:'center'}}> Registro de Clientes Cadastrados</Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign:'center'}}>
                    { anterior.conta } clientes se cadastraram no último mês.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card border="success" style={{ width: '18rem' }}>
                <Card.Header style={{fontWeight:'bold',textAlign:'center'}}> Quantidade de Clientes Simples Nacional</Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign:'center'}}>
                        Atualmente possuimos { clientes.tamClientesSimples } clientes do tipo Simples Nacional.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            </div>
        </div>
    );
}

export default Dashboard;
