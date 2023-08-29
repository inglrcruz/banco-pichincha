import { changeStage } from '../slices/product';
import { get, post, put, remove } from '../../library/requests';
import { IProduct } from '../../interfaces/productInterface';

export const configDialogDefault = {
    title: "Lo Sentimos, Ha Ocurrido un Problema",
    message: "Lo sentimos, ha ocurrido un error interno. Por favor, inténtalo de nuevo más tarde o ponte en contacto con el soporte técnico si el problema persiste."
}

/**
 * Fetches the list of products and updates the application state.
 * @param {*} dispatch 
 */
export const getProductList = async (dispatch: any) => {
    try {
        dispatch(changeStage({ loading: true }))
        const { data } = await get("bp/products");
        dispatch(changeStage({ list: data.reverse() }))
    } catch (error) {
        setDialogConfig(configDialogDefault, dispatch)
    } finally {
        dispatch(changeStage({ loading: false }))
    }
}

/**
 * Sets the selected product and updates the application state.
 * @param {*} data 
 * @param {*} dispatch 
 */
export const setSelectedProduct = async (data: IProduct, dispatch: any) => {
    dispatch(changeStage({ selected: data }))
}

/**
 * Add a new product if the ID does not exist and update the status of the application.
 * @param {*} form 
 * @param {*} dispatch 
 * @returns 
 */
export const setProduct = async (form: IProduct, dispatch: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            dispatch(changeStage({ loading: true }))
            const verification = await get(`bp/products/verification?id=${form.id}`)
            if (!verification.data) {
                const { data } = await post("bp/products", form)
                resolve(data)
            } else {
                reject(verification.data)
            }
        } catch (error) {
            setDialogConfig(configDialogDefault, dispatch)
        } finally {
            dispatch(changeStage({ loading: false }))
        }
    })
}

/**
 * Updates an existing product and updates the application state.
 * @param {*} form 
 * @param {*} dispatch 
 * @returns 
 */
export const setUpdProduct = async (form: IProduct, dispatch: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            dispatch(changeStage({ loading: true }))
            const { data } = await put("bp/products", form)
            resolve(data)
        } catch (error) {
            setDialogConfig(configDialogDefault, dispatch)
        } finally {
            dispatch(changeStage({ loading: false }))
        }
    })
}

/**
 * Deletes a product by its ID and updates the application state.
 * @param {*} id 
 * @param {*} dispatch 
 */
export const setRemove = async (id: number, dispatch: any) => {
    try {
        dispatch(changeStage({ loading: true }))
        await remove(`bp/products?id=${id}`);
    } catch (error) {
        setDialogConfig(configDialogDefault, dispatch)
    } finally {
        dispatch(changeStage({ loading: false }))
    }
}

/**
 * Sets the dialog configuration in the application state.
 * @param {*} config 
 * @param {*} dispatch 
 */
export const setDialogConfig = (config: any, dispatch: any) => {
    dispatch(changeStage({ dialogConfig: config }))
}