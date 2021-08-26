import { api } from "../../services/api";
import { Form, Button, Col } from "react-bootstrap";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup"

function Cadastrar() {

    const notify = () => toast("Cadastrado com sucesso!");

    const schema = yup.object().shape({
        razao: yup.string().required("Campo Obrigatório, preencha sua Razão Social"),
        cnpj: yup.string().required("Campo Obrigatório, preencha seu CNPJ"),
        email: yup.string().required("Campo Obrigatório, preencha seu Email."),
    });


    return (

        <div>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover

            />
            <h1 style={{fontWeight:'bold', paddingLeft:'0.2em'}}>
                CADASTRO DE CLIENTES
            </h1>

            <Formik
                validationSchema={schema}
                onSubmit={(values, { resetForm, setErrors }) => {
                    try {
                        api.post("/clientes", values).then(result => {
                            notify()
                            resetForm({ values: '' })
                        })
                    } catch (e) {
                        setErrors(e)
                    }

                }}
                initialValues={{
                    razao: '',
                    email: '',
                    cnpj: '',
                    tipo: 0,
                    data: new Date()
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
                    <Form onSubmit={handleSubmit} style={{paddingLeft:'1em',paddingRight:'1em'}} >
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
                                <Form.Label as="legend" column sm={3}>
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
                                            defaultChecked={"TRUE"}
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
                            </Form.Group>
                        </fieldset>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Cadastrar;
