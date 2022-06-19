import { Button, Modal } from 'antd';
import React, { useState } from 'react';

const Infomation = ({ title = '', render = null, isVisible = false, onClose = null }) => {

    return (
        <Modal
            title={title}
            visible={isVisible}
            onOk={() => onClose()}
            onCancel={() => onClose()}
            width={800}
            footer={null}
            closable={false}
            className="modal-style-info"
        >
            {render}
        </Modal>
    );
};

export default Infomation;