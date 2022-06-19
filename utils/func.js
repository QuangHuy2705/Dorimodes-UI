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

export default {
    confirmation
}