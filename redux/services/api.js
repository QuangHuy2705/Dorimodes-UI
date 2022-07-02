import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_HOST

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
    timeout: 20000,
})

api.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
    }
    return config
})

api.interceptors.response.use(
    response => {
        const { data } = response
        if (data.error) {
            return Promise.reject({
                response: {
                    ...data.error,
                },
            })
        }
        return response
    },
    error => {
        const { tokenExpiredAlert } = store.getState().app
        // checking tokenExpired for prevent show alert twice
        if (error.response?.status === 401 && !tokenExpiredAlert) {
            store.dispatch(AppActions.expireToken())
            Alert.alert(
                'Login session expired',
                'Your session has expired. Please Click OK to log in again.',
                [
                    {
                        text: 'OK',
                        onPress: () => store.dispatch(AuthActions.logOut()),
                    },
                ]
            )
        }
        return Promise.reject(error)
    }
)

export default api
