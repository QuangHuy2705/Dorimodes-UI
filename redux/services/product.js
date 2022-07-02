import api from './api'

const getProduct = async () => {
    try {
        const { data } = await api.get(`/product`)
        return data
    } catch (error) {

    }
}

const getProductWithFilter = async (filters) => {
    try {
        const { data } = await api.post(`/product/get-all-with-filter`, {
            ...filters
        })
        return data
    } catch (error) {

    }
}

export default {
    getProduct,
    getProductWithFilter
}