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
        message: { title },
        description: { content }
    });
}

const KEY_CART_STORAGE = 'KEY_CART_STORAGE'

const addToCart = (data) => {
    const nomarlize = {
        product: {
            id: data.id,
            size: data.size,
            color: data.color,
            quantity: data.quantity
        }
    }
    localStorage.setItem(KEY_CART_STORAGE, data)
}



export default {
    confirmation,
    convertNumber,
    notificationAlert
}