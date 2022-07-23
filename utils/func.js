import { notification, Modal, } from 'antd'

const { confirm } = Modal;

const confirmation = (title = '', content = '') => {
    return confirm({
        title: title,
        content: content,
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

const convertNumber = (number) => {
    return parseInt(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

const notificationAlert = (type = 'success', title = '', content = '') => {
    notification[type]({
        message: title,
        description: content
    });
}

const KEY_CART_STORAGE = 'KEY_CART_STORAGE'

const getCartCurrent = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(KEY_CART_STORAGE))
    }
    return
}

const addToCart = (data) => {
    try {
        let stored = getCartCurrent()
        if (!stored) {
            stored = []
        }
        const nomarlize = {
            id: data.id,
            size: data.size || null,
            quantity: data.quantity || null,
            name: data.name,
            itemQuantity: data.itemQuantity || 1,
            price: data.price | 0
        }
        stored.push(nomarlize)
        localStorage.setItem(KEY_CART_STORAGE, JSON.stringify(stored))
    } catch (error) {

    }
}

const removeItemFromCart = (index) => {
    try {
        let stored = getCartCurrent()
        if (!stored) {
            return;
        }
        if (index > -1) {
            stored.splice(index, 1)
        }
        localStorage.setItem(KEY_CART_STORAGE, JSON.stringify(stored))
    } catch (error) {

    }
}

const removeAllCart = () => {
    try {
        localStorage.removeItem(KEY_CART_STORAGE)
    } catch (error) {

    }
}

export default {
    confirmation,
    convertNumber,
    notificationAlert,
    addToCart,
    getCartCurrent,
    removeItemFromCart,
    removeAllCart
}