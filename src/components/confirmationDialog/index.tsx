import React, { useState } from 'react';
import './style.scss';
import { ConfirmationDialogProps } from '../../interfaces/dialogInterface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ConfirmationDialog = ({ title, message, onConfirm, onCancel }: ConfirmationDialogProps) => {

    const [isVisible, setIsVisible] = useState<Boolean>(true)

    /**
     * Handles the commit and hides the component.
     */
    const handleConfirm = () => {
        setIsVisible(false)
        onConfirm()
    }

    /**
     * Handles cancellation and hides the component if onCancel is set.
     */
    const handleCancel = () => {
        setIsVisible(false)
        if (onCancel) onCancel()
    }

    return (
        isVisible && (
            <div id="confirmation-dialog">
                <div className="confirmation-dialog-content">
                    <h4><FontAwesomeIcon icon={faInfoCircle} />&nbsp;&nbsp;{title}</h4>
                    <p>{message}</p>
                    <div className={"footer " + (onCancel ? "footer-flex" : "footer-block")}>
                        {onCancel && <button onClick={handleCancel}>Cancelar</button>}
                        <button onClick={handleConfirm}>{onCancel ? "Confirmar" : "Aceptar"}</button>
                    </div>
                </div>
            </div>
        )
    )
}

export default ConfirmationDialog
