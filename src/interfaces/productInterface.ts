export interface IProduct {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: any;
    date_revision: any;
}

export interface IProps {
    products: IProduct[];
    getProductList: (dispatch: any) => void;
}

export interface IPropsForm {
    item: any;
    setDialogConfig: (config: any, dispatch: any) => void;
    setProduct: (form: any, dispatch: any) => void;
    setUpdProduct: (form: any, dispatch: any) => void;
    setSelectedProduct: (item: any, dispatch: any) => void
}

export interface TableProductsProps {
    data: IProduct[] | undefined;
}
