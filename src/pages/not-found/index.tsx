import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './style.scss'

const NotFound = () => {

    return (<>
    <Header></Header>
            <section className="main" id="not-found">
                <div className="container-not-found">
                    <h1 className="vivid-red">404</h1>
                    <h4>Houston, tenemos un problema...</h4>
                    <h4>La p&aacute;gina no ha sido encontrada.</h4>
                    <Link to="/">Ir a la p&aacute;gina principal</Link>
                </div>
            </section>
            </>)

}

export default NotFound