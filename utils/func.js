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

const addToCart = () => {

}

export default {
    confirmation,
    convertNumber,
    notificationAlert
}