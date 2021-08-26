import { api } from "../../services/api";
import { Form,Button } from "react-bootstrap";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";

function Cadastrar() {
    
    const notify = () => toast("Cadastrado com sucesso!");
    
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
            <h1>
            Cadastrar
        </h1>
        
        <Formik
        onSubmit={(values,{resetForm})=>{
            console.log(values)
            api.post("/clientes",values).then(result=>{
                notify()
                resetForm({values:''})
            }) 
        }}
        initialValues={{
            razao: '',
            email: '',
            cnpj: '',
            tipo: ''
        }}
        >
        {({
            handleSubmit,
            handleChange,
            values,
        }) => (
        <Form noValidate onSubmit={handleSubmit} >
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
                onChange={handleChange}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Endereço Email</Form.Label>
                <Form.Control type="email" placeholder="Digite seu Email" 
                name="email"
                value={values.email}
                onChange={handleChange}/>
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
  