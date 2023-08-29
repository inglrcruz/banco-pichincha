import axios from 'axios'

const url: any = process.env.REACT_APP_URL;
axios.defaults.headers.common['authorId'] = process.env.REACT_APP_KEY;

/**
 * Request to perform POST
 * @param {string} route 
 * @param {object} params 
 * @returns {Promise<any>}
 */
export const post = (route: string, params: object): Promise<any> => {
    return axios.post(url + route, params);
}

/**
 * Request to perform PATCH
 * @param {string} route 
 * @param {object} params 
 * @returns {Promise<any>}
 */
export const put = (route: string, params: object): Promise<any> => {
    return axios.put(url + route, params);
}

/**
 * Request to perform GET
 * @param {string} route 
 * @returns {Promise<any>}
 */
export const get = (route: string): Promise<any> => {
    return axios.get(url + route);
}

/**
 * Request to perform DELETE
 * @param {string} route 
 * @returns {Promise<any>}
 */
export const remove = (route: string): Promise<any> => {
    return axios.delete(url + route);
}

/**
 * If there is any error
 * @param {any} err 
 */
export const errorRequest = (err: any) => {
    // Handle errors here if needed
}