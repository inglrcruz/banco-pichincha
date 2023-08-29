import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {

    return (
        <>
            <div id="loading">
                <div className="content">
                    <i className="fas fa-spinner fa-pulse"></i>
                    <FontAwesomeIcon icon={faSpinner} pulse size="lg" />
                    <p>Cargando, espere...</p>
                </div>
            </div >
        </>
    )
}

export default Loading