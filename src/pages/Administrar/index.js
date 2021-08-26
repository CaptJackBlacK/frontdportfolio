import { useCallback, useEffect, useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { api } from "../../services/api";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Formik } from "formik";

function Administrar() {
    const [clientes, setClientes] = useState([])
    const [id, setId] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRequest = useCallback(() => {
        api.get("/clientes").then(result => {
            setClientes(result.data)
            console.log(result.data)
        })
    }, [])


    useEffect(() => {
        handleRequest()
    }, [handleRequest])

    function handleModal(idCliente) {
        setId(idCliente) 
        handleShow()
    }

    function handleEdit(values,idCliente) {
        api.put(`/clientes/${idCliente}`,values).then(result=>{
            console.log(result)
            handleClose()
            handleRequest()
        }) 
    }

    function handleDelete(idCliente) {
        api.delete(`/clientes/${idCliente}`).then(result => {
            console.log(result)
            handleRequest()
        })

    }

    return (

        <div>
         <h1>CONTROLE DE CLIENTES</h1>
    {clientes.length > 0 &&
        <ListGroup>
            {clientes.map(cliente => (
        <div key={cliente.id} >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={(values) => {
                            handleEdit(values,id)
                        }}
                        initialValues={{
                            razao: cliente.razao,
                            email: cliente.email,
                            cnpj: cliente.cnpj,
                            tipo: cliente.tipo
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="razao">
                                    <Form.Label>Razão Social</Form.Label>
                                    <Form.Control type="text" placeholder="Digite sua Razão Social"
                                        name="razao"
                                        value={values.razao}
                                        onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="cnpj">
                                    <Form.Label>CNPJ</Form.Label>
                                    <Form.Control type="number" placeholder="CNPJ"
                                        name="cnpj"
                                        value={values.cnpj}
                                        onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Endereço Email</Form.Label>
                                    <Form.Control type="email" placeholder="Digite seu Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange} />
                                    <Form.Text className="text-muted">
                                        Nós nunca compartilharemos seu email com mais ninguem.
                                    </Form.Text>
                                </Form.Group>

                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            onChange={handleChange}
                                            inline
                                            label="Simples Nacional"
                                            name="tipo"
                                            type={type}
                                            value={0}
                                            id={`inline-${type}-1`}
                                        />
                                        <Form.Check
                                            onChange={handleChange}
                                            inline
                                            label="Lucro Presumido"
                                            name="tipo"
                                            type={type}
                                            value={1}
                                            id={`inline-${type}-2`}
                                        />
                                    </div>
                                    
                                ))}

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                                </Button>
                                <Button variant="primary" type="submit">
                                    Salvar Mudanças
                                </Button>
                            </Modal.Footer>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
                
                </Modal>
            
                        <ListGroup.Item >
                            <div style={{ display: "flex", justifyContent: "space-between", alignContent: "flex-end" }}>
                                <div>
                                    <span> {cliente.cnpj} - {cliente.razao} </span>
                                </div>

                                <div>
                                    <Button onClick={() => handleModal(cliente.id)} variant="outline-primary" style={{ marginRight: "0.5rem" }}>
                                        <FaEdit style={{ marginRight: "0.5rem" }} />
                                        EDITAR
                                    </Button>
                                    <Button onClick={() => handleDelete(cliente.id)} variant="outline-danger" style={{ marginRight: "0.5rem" }}>
                                        <FaTrashAlt style={{ marginRight: "0.5rem" }} />
                                        DELETAR
                                    </Button>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </div>
                    ))}

                </ListGroup>
            }

        </div>
    )
}

export default Administrar;