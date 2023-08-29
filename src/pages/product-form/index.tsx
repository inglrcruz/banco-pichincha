import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { momentFormatted, momentSum } from "../../library/utilities";
import { connect, useDispatch } from 'react-redux'
import { setProduct, setUpdProduct, setSelectedProduct, setDialogConfig } from '../../redux/actions/product'
import { IProduct, IPropsForm } from '../../interfaces/productInterface'
import { DialogProps } from "../../interfaces/dialogInterface";
import { Link } from 'react-router-dom';
import './style.scss'
import Header from '../../components/header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ProductForm = ({ item, setProduct, setUpdProduct, setSelectedProduct, setDialogConfig }: IPropsForm) => {
    const dispatch = useDispatch(), navigate = useNavigate()
    const initialFormData: IProduct = {
        id: item?.id || '',
        name: item?.name || '',
        description: item?.description || '',
        logo: item?.logo || '',
        date_release: item?.date_release ? new Date(item?.date_release) : '',
        date_revision: item?.date_revision || ''
    }
    const [formData, setFormData] = useState<IProduct>(initialFormData)
    const [errors, setErrors] = useState<Partial<IProduct>>({})
    const [done, setDone] = useState<Boolean>(false)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [openPage, setOpenPage] = useState<Boolean>(false)

    // Perform cleanup when the component unmounts or when 'openPage' changes.
    useEffect(() => {
        return () => {
            if (openPage) {
                // Reset selected product and navigate to the home page.
                setSelectedProduct([], dispatch)
                navigate('/')
            }
            setOpenPage(!openPage)
        }
    }, [openPage, setOpenPage, setSelectedProduct, dispatch, navigate])

    /**
     * Updates the form data when the date input changes and handles date_revision calculation.
     * @param date 
     */
    const handleDateChange = (date: any | null) => {
        setFormData({ ...formData, date_release: date, date_revision: momentSum(date, 1) })
        handleError('date_release')
    }

    /**
     * Handles changes in input fields and updates the form data accordingly.
     * @param e 
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        handleError(name)
    }

    /**
     * Handles form submission, performs validation, and either updates or creates a new product.
     * @param e 
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const ERROR_MESSAGES: any = {
            id: 'El ID',
            name: 'El nombre',
            description: 'La descripción',
            logo: 'El logo',
            date_release: 'La fecha de liberación'
        }
        const newErrors: Partial<any> = {}
        const form: any = formData
        for (const field in ERROR_MESSAGES) {
            if ((typeof form[field] === "string" && !form[field].trim()) || !form[field]) newErrors[field] = `* ${ERROR_MESSAGES[field]} es requerido.`;
        }

        if (!Object.keys(newErrors).length) {
            try {
                if (item?.id) {
                    await setUpdProduct(formData, dispatch)
                    setDone(true)
                    setTimeout(() => setDone(false), 3000)
                } else {
                    await setProduct({
                        ...formData,
                        date_release: momentFormatted(formData.date_release, "YYYY-MM-DD"),
                        date_revision: momentFormatted(formData.date_revision, "YYYY-MM-DD")
                    }, dispatch)
                    setDone(true)
                    handleReset()
                    setTimeout(() => setDone(false), 3000)
                }
            } catch (error) {
                if (error === true) {
                    const config: DialogProps = {
                        title: "ID no disponible",
                        message: `Ya existe un producto con el ID ${formData.id} registrado. Por favor, intente con otro ID.`
                    }
                    setDialogConfig(config, dispatch)
                }
            }
        }
        setErrors(newErrors);
    }

    /**
     * Removes the error associated with a specific form field when it is corrected.
     * @param name 
     */
    const handleError = (name: string) => {
        if (errors.hasOwnProperty(name)) {
            const er: any = errors
            delete er[name]
            setErrors(er)
        }
    }

    /**
     * Resets the form data to its initial values.
     */
    const handleReset = () => {
        setFormData(initialFormData)
    }

    /**
     * Handles canceling the form submission and navigation.
     */
    const handleCancel = () => {
        setOpenPage(!openPage)
    }

    return (
        <>
            <Header></Header>
            <section className="main" id="form">
                <Link to="/"><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;Volver Atras</Link>
                <div className="card">
                    <h2>Formulario de Registro</h2>
                    <form ref={formRef}>
                        <div className="row">
                            <div className="col">
                                <label>ID</label>
                                <input type="text" name="id" value={formData.id} onChange={handleChange} disabled={item?.id} placeholder="Ingrese el id..." />
                                {errors.id && <span className="error">{errors.id}</span>}
                            </div>
                            <div className="col">
                                <label>Nombre</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ingrese el nombre..." />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Descripci&oacute;n</label>
                                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Ingrese la descripción..." />
                                {errors.description && <span className="error">{errors.description}</span>}
                            </div>
                            <div className="col">
                                <label>Logo</label>
                                <input type="text" name="logo" value={formData.logo} onChange={handleChange} placeholder="Ingrese el logo..." />
                                {errors.logo && <span className="error">{errors.logo}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Fecha de liberaci&oacute;n</label>
                                <DatePicker name="date_release" value={formData.date_release} onChange={handleDateChange} placeholderText="Selecione la fecha..." selected={formData.date_release} dateFormat="dd/MM/yyyy" />
                                {errors.date_release && <span className="error">{errors.date_release}</span>}
                            </div>
                            <div className="col">
                                <label>Fecha de revici&oacute;n</label>
                                <input type="text" name="date_release" value={formData.date_revision && momentFormatted(formData.date_revision)} disabled />
                            </div>
                        </div>
                        {done && <p className="successfully"><FontAwesomeIcon icon={faInfoCircle} />&nbsp;&nbsp;&nbsp;Guardado exitosamente</p>}
                        <div className="footer">
                            {!formData?.id && <button type="button" onClick={handleReset}>Reiniciar</button>}
                            {formData?.id && <button type="button" onClick={handleCancel}>Cancelar</button>}
                            <button type="button" onClick={handleSubmit} disabled={(Object.keys(errors).length > 0 || done) ? true : false}>Enviar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    item: state.product.selected
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        setSelectedProduct: (item: any) => setSelectedProduct(item, dispatch),
        setProduct: (form: any) => setProduct(form, dispatch),
        setUpdProduct: (form: any) => setUpdProduct(form, dispatch),
        setDialogConfig: (config: any) => setDialogConfig(config, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)