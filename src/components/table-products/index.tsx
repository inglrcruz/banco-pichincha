import { useState } from "react";
import './style.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { momentFormatted } from "../../library/utilities";
import { IProduct, TableProductsProps } from "../../interfaces/productInterface";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRemove, setSelectedProduct } from '../../redux/actions/product'
import ConfirmationDialog from "../confirmationDialog";

const TableProducts = ({ data }: TableProductsProps) => {

    const dispatch = useDispatch(), navigate = useNavigate();
    const [isConfirmationVisible, setIsConfirmationVisible] = useState<Boolean>(false)
    const [idUpdate, setIDUpdate] = useState<any>(null)

    /**
     * Handle the removal of a product based on its ID.
     * @param id 
     */
    const handleRemove = (id: string) => {
        setIDUpdate(id)
        setIsConfirmationVisible(true)
    }

    /**
     * Handle the selection of a product for updating and navigation.
     * @param item 
     */
    const handleUpdate = (item: IProduct) => {
        setSelectedProduct(item, dispatch)
        navigate(`update`)
    }

    /**
 * Delete the product by the selected id
 */
    const handleConfirmDialog = () => {
        setRemove(idUpdate, dispatch)
        setIsConfirmationVisible(false)
    }

    /**
     * Hide the confirmation modal
     */
    const handleCancelDialog = () => {
        setIsConfirmationVisible(false)
        setIDUpdate(null)
    }

    return (
        <>
            <table id="table-products">
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Nombre del producto</th>
                        <th>Descripci&oacute;n</th>
                        <th>Fecha de liberaci&oacute;n</th>
                        <th>Fecha de revici&oacute;n</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: any) => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.logo} alt="" onError={
                                    (e: any) => {
                                        e.target.src = "assets/not-available.webp"
                                    }
                                } />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{momentFormatted(item.date_release)}</td>
                            <td>{momentFormatted(item.date_revision)}</td>
                            <td>
                                <div className="tooltip-container">
                                    <div className="option">
                                        <FontAwesomeIcon icon={faEllipsisVertical} className="pointer" />
                                    </div>
                                    <div className="tooltip">
                                        <h4>Opciones</h4>
                                        <div>
                                            <button className="tooltip-button edit-button" onClick={() => handleUpdate(item)}>Editar</button>
                                            <button className="tooltip-button delete-button" onClick={() => handleRemove(item.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isConfirmationVisible && (<ConfirmationDialog
                title="Eliminar Producto"
                message="¿Estás seguro de que deseas eliminar este producto?"
                onConfirm={handleConfirmDialog}
                onCancel={handleCancelDialog} />
            )}
        </>
    );
}

export default TableProducts