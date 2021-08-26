import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cadastrar from './pages/Cadastrar';
import Dashboard from './pages/Dashboard';
import Administrar from './pages/Administrar';
export default function Routes() {

    return (
        <Router>
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/cadastrar' component={Cadastrar} />
                    <Route path='/administrar' component={Administrar} />
                    
                </Switch>
        </Router>
    )
}