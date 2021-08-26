import { useCallback, useEffect, useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { api } from "../../services/api";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Formik } from "formik";
import * as yup from "yup"

function Administrar() {
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const schema = yup.object().shape({
        razao: yup.string().required("Campo Obrigatório, preencha sua Razão Social"),
        cnpj: yup.string().required("Campo Obrigatório, preencha seu CNPJ"),
        email: yup.string().required("Campo Obrigatório, preencha seu Email."),
    });

    const handleRequest = useCallback(() => {
        api.get("/clientes").then(result => {
            setClientes(result.data)
            console.log(result.data)
        })
    }, [])


    useEffect(() => {
        handleRequest()
    }, [handleRequest])

    function handleModal(cliente) {
        setCliente(cliente)
        handleShow()
    }

    function handleEdit(values, idCliente) {
        api.put(`/clientes/${idCliente}`, values).then(result => {
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
            <h1 style={{fontWeight:'bold', paddingLeft:'0.2em'}}>CONTROLE DE CLIENTES</h1>
            {clientes.length > 0 &&
        <>
        {cliente && 
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        handleEdit(values, cliente.id)
                    }}
                    initialValues={{
                        razao: cliente.razao ?? '',
                        email: cliente.email ?? '',
                        cnpj: cliente.cnpj ?? '',
                        tipo: cliente.tipo ?? '',
                        data: cliente.data ?? ''
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="razao">
                                <Form.Label>Razão Social</Form.Label>
                                <Form.Control type="text" placeholder="Digite sua Razão Social"
                                    name="razao"
                                    value={values.razao}
                                    onChange={handleChange}
                                    isInvalid={!!errors.razao}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.razao}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="cnpj">
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control type="number" placeholder="CNPJ"
                                    name="cnpj"
                                    value={values.cnpj}
                                    onChange={handleChange}
                                    isInvalid={!!errors.cnpj}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cnpj}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Endereço Email</Form.Label>
                                <Form.Control type="email" placeholder="Digite seu Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Nós nunca compartilharemos seu email com mais ninguem.
                                </Form.Text>
                            </Form.Group>

                            <fieldset>
                                <Form.Group className="mb-3">
                                    <Form.Label as="legend" column sm={10}>
                                        Tipo de Regimo de Tributação
                                    </Form.Label>
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
                                                defaultChecked={cliente.tipo === "SIMPLESNACIONAL"}
                                            />
                                            <Form.Check
                                                onChange={handleChange}
                                                inline
                                                label="Lucro Presumido"
                                                name="tipo"
                                                type={type}
                                                value={1}
                                                id={`inline-${type}-2`}
                                                defaultChecked={cliente.tipo === "LUCROPRESUMIDO"}
                                            />
                                        </div>

                                    ))}
                                </Form.Group>
                            </fieldset>
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
        }
            
                <ListGroup>
                <div style={{backgroundColor:'black'}} >    
                <ListGroup.Item variant="dark">
                <div style={{fontWeight:'bold', display: "flex", justifyContent: "space-between", alignContent: "flex-end"}}>
                    <span> CNPJ - Razão Social - Email - Tipo de Regime de Tributação - Data do Cadastro </span>
                </div>
                </ListGroup.Item>
                </div>
                    {clientes.map((cliente) => (
                        <div key={cliente.id} >
                            
                            
                            <ListGroup.Item >
                                <div style={{ display: "flex", justifyContent: "space-between", alignContent: "flex-end" }}>
                                    <div>
                                        <span> {cliente.cnpj} - {cliente.razao} - {cliente.email} - {cliente.tipo} - {cliente.dataFormatada} </span>
                                    </div>

                                    <div>
                                        <Button onClick={() => handleModal(cliente)} variant="outline-primary" style={{ marginRight: "0.5rem" }}>
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
                </>
            }
                
        </div>
    )
}

export default Administrar;