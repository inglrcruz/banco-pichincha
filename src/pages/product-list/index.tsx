import React, { useEffect, useState } from "react";
import './style.scss'
import { connect, useDispatch } from 'react-redux'
import { getProductList } from '../../redux/actions/product'
import { IProduct, IProps } from '../../interfaces/productInterface'
import Header from "../../components/header";
import { Link } from "react-router-dom";
import TableProducts from "../../components/table-products";
import Paginator from "../../components/paginator";

const ProductList = ({ products, getProductList }: IProps) => {

    const dispatch = useDispatch();
    const [data, setData] = useState<IProduct[]>()
    const [filter, setFilter] = useState<string>("")
    const [perPage] = useState<any>([5, 10, 20, 25])
    const [itemsPerPage, setItemsPerPage] = useState<number>(perPage[0])

    // Fetch the product list when the component mounts or when the dispatch function changes.
    useEffect(() => {
        getProductList(dispatch)
    }, [getProductList, dispatch])

    // Update the displayed page when the product data or items per page change.
    useEffect(() => {
        handleChangePage(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products, itemsPerPage])

    /**
     * Handle pagination by updating the displayed data range.
     * @param startIndex 
     * @param endIndex 
     */
    const handleChangePage = (startIndex: number, endIndex: number = itemsPerPage) => {
        setData(products.slice(startIndex, endIndex))
    }

    /**
     * Handle changes in input fields, such as filtering or changing items per page.
     * @param e 
     */
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { value, name } = e.target
        if (name === "itemsPerPage") {
            // Update the number of items displayed per page.
            setItemsPerPage(parseInt(value))
        } else {
            // Update the filter value and filter the product data.
            setFilter(value)
            const data = ((products) ? products : []).filter((item: IProduct) => {
                return (
                    // Check if either the name or description matches the filter (case-insensitive).
                    (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
                    (item.description && item.description.toLowerCase().includes(value.toLowerCase()))
                ) ? true : false
            })
            setData(data.slice(0, itemsPerPage))
        }
    }

    return (
        <>
            <Header></Header>
            <section className="main" id="list">
                <section className="table-header">
                    <input type="text" placeholder="Buscar por nombre o descripción..." name="filter" value={filter} onChange={handleChange} />
                    <Link className="button" to="/add">Agregar</Link>
                </section>
                <section className="table-body card">
                    <TableProducts data={data} />
                    <section className="table-footer">
                        <label>{(filter) ? data?.length : products.length} Resultados</label>
                        <Paginator totalItems={products.length} itemsPerPage={itemsPerPage} onPageChange={(startIndex, endIndex) => handleChangePage(startIndex, endIndex)} />
                        <select name="itemsPerPage" onChange={handleChange}>
                            {perPage.map((val: number, key: number) => <option key={key} value={val}>{val}</option>)}
                        </select>
                    </section>
                </section>
            </section>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    products: state.product.list
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        getProductList: () => getProductList(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
