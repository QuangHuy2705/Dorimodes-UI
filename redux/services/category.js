import api from './api'

const getCategory = async () => {
    try {
        const { data } = await api.get(`/category`)
        return data
    } catch (error) {

    }
}

export default {
    getCategory
}