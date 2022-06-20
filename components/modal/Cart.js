import { Button, Modal, Col, Row, InputNumber } from 'antd';
import React, { useState } from 'react';
import { ShoppingCartOutlined, CheckOutlined } from '@ant-design/icons'

const Cart = ({ title = '', data = null, isVisible = false, onClose = null }) => {

    return (
        <Modal
            title={title}
            visible={isVisible}
            onOk={() => onClose()}
            onCancel={() => onClose()}
            width={800}
            footer={null}
            className="modal-style-info"
        >
            <Row>
                <Col span={24} className='fw-500 fs-18'>
                    <CheckOutlined style={{ color: 'rgb(7, 164, 54)', fontSize: 20 }} />&nbsp;&nbsp;Bạn đã thêm {data.name} vào giỏ hàng
                </Col>
                <Col span={24} className='table-cart mt-10'>
                    <div>
                        <ShoppingCartOutlined style={{ color: 'rgb(5, 112, 218)', fontSize: 20 }} /> <span style={{ fontSize: 18 }}>Giỏ hàng của bạn ({'5'} sản phẩm)</span>
                    </div>
                    <table className='mt-10'>
                        <tr>
                            <td>SẢN PHẨM</td>
                            <td>ĐƠN GIÁ</td>
                            <td>SỐ LƯỢNG</td>
                            <td>THÀNH TIỀN</td>
                        </tr>
                        <tr>
                            <td>Bikini</td>
                            <td>720</td>
                            <td>2</td>
                            <td>140</td>
                        </tr>
                    </table>
                </Col>
                <Col span={24} className='mt-20' style={{ textAlign: 'right' }}>
                    <button className='btn-order-category' >Tiến hành đặt hàng</button>
                </Col>
            </Row>
        </Modal>
    );
};

export default Cart;