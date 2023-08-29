import './style.scss'
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
            <Link to="/"><img src="assets/logo-pichincha.webp" alt="Logo Pichincha" /></Link>
        </header>
    );
}

export default Header