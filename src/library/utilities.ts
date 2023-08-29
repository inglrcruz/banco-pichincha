import moment from 'moment'

/**
 * Formats a given date using the specified format using the 'moment' library.
 * @param {*} date 
 * @param {*} format
 * @returns 
 */
export const momentFormatted = (date: string = "", format: string = "DD/MM/YYYY") => {
    if (!date) throw new Error("A valid date is required.")
    return moment(date).format(format)
}

/**
 * Adds or subtracts a specified count of units (e.g., years, months) to/from a given date using the 'moment' library.
 * @param {*} date 
 * @param {*} type 
 * @returns 
 */
export const momentSum = (date: string, count: any, unit = 'years') => {
    return moment(date).add(count, unit)
}