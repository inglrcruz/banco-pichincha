import {
    getProductList,
    setProduct,
    setUpdProduct,
    setRemove
} from './product';
import { changeStage } from '../slices/product';
import { IProduct } from '../../interfaces/productInterface';

const product: IProduct = {
    id: "lc-999",
    name: "test",
    description: "test",
    logo: "tes",
    date_release: "2023-08-23T00:00:00.000+00:00",
    date_revision: "2024-08-23T00:00:00.000+00:00"
};

const products: IProduct[] = [{
    id: "d3-34",
    name: "test",
    description: "test",
    logo: "tes",
    date_release: "2023-08-23T00:00:00.000+00:00",
    date_revision: "2024-08-23T00:00:00.000+00:00"
}, {
    id: "d3-54",
    name: "test",
    description: "test",
    logo: "tes",
    date_release: "2023-08-23T00:00:00.000+00:00",
    date_revision: "2024-08-23T00:00:00.000+00:00"
}];


jest.mock('../../library/requests', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn()
}));

jest.mock('../slices/product', () => ({
    changeStage: jest.fn(),
}));

describe('setProduct Function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Get product list
     */

    test('getProductList should dispatch actions correctly on success', async () => {
        const dispatch = jest.fn();

        const responseData: IProduct[] = products;
        (require('../../library/requests').get as jest.Mock).mockResolvedValueOnce({ data: products });

        await getProductList(dispatch);

        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: true }));
        expect(dispatch).toHaveBeenCalledWith(changeStage({ list: responseData.reverse() }));
        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: false }));
    });

    test('getProductList should dispatch actions correctly on error', async () => {
        const dispatch = jest.fn();

        const error = new Error('API error');
        (require('../../library/requests').get as jest.Mock).mockRejectedValueOnce(error);

        await getProductList(dispatch);

        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: true }));
        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: false }));
    });

    /**
     * Add new product
     */

    test('setProduct should resolve with data when ID does not exist', async () => {
        const form: IProduct = product

        const dispatch = jest.fn();

        (require('../../library/requests').get as jest.Mock).mockResolvedValueOnce({ data: null });
        (require('../../library/requests').post as jest.Mock).mockResolvedValueOnce({ data: form });

        const result = await setProduct(form, dispatch);

        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: true }));
        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: false }));
        expect(result).toEqual(form);
    });

    test('setProduct should reject with verification data when ID exists', async () => {
        const form: IProduct = product
        const dispatch = jest.fn();

        const verificationData = { id: "lc-999" };
        (require('../../library/requests').get as jest.Mock).mockResolvedValueOnce({ data: verificationData });

        try {
            await setProduct(form, dispatch);
        } catch (error) {
            expect(error).toEqual(verificationData);
            expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: true }));
            expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: false }));
        }
    });

    /**
     * Update product 
     */

    test('setUpdProduct should resolve with data on success', async () => {
        const form: IProduct = { ...product, name: "Test 44" };
        const dispatch = jest.fn();

        const responseData = { ...product, name: "Test 44" };
        (require('../../library/requests').put as jest.Mock).mockResolvedValueOnce({ data: responseData });

        const result = await setUpdProduct(form, dispatch);

        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: true }));
        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: false }));
        expect(result).toEqual(responseData);
    });

    /**
     * Delete product
     */

    test('setRemove should dispatch actions correctly on success', async () => {
        const id = 123;
        const dispatch = jest.fn();

        (require('../../library/requests').remove as jest.Mock).mockResolvedValueOnce({ });

        await setRemove(id, dispatch);

        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: true }));
        expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: false }));
    });

    test('setRemove should dispatch actions correctly on error', async () => {
        const id = 456;
        const dispatch = jest.fn();

        const error = new Error('API error');
        (require('../../library/requests').remove as jest.Mock).mockRejectedValueOnce(error);

        try {
            await setRemove(id, dispatch);
        } catch (error) {
            expect(error).toEqual(error);
            expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: true }));
            expect(dispatch).toHaveBeenCalledWith(changeStage({ loading: false }));
        }
    });

});