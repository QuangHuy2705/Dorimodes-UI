import api from './api'

const order = async (body) => {
    try {
        const { data } = await api.post(`/order`, {
            "data": body
        })
        return data
    } catch (error) {

    }
}

export default {
    order
}