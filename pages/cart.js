import React, { useEffect } from 'react'
import HeaderComponent from '../components/header'
import { Row, Col, Timeline, Form, Input, Button } from 'antd'
import {
    ShoppingOutlined,
    LikeOutlined,
    PhoneOutlined,
    UserOutlined,
    PoundOutlined,
    SoundOutlined
} from '@ant-design/icons'
import func from '../utils/func'
import { getLanguage } from '../utils/laguage'

const { TextArea } = Input;

function Cart() {
    const t = getLanguage()

    return (
        <div className='flex-align-center' style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div className='main-header'>
                <HeaderComponent />
            </div>
            <Row style={{ width: '100%' }}>
                <Col span={6} />
                <Col span={12}>
                    <Col span={24} className='table-cart mt-10'>
                        <div>
                            <ShoppingOutlined style={{ color: 'rgb(5, 112, 218)', fontSize: 20 }} /> <span style={{ fontSize: 18 }}>{t.CART.yourCart} ({'5'} {t.CART.products})</span>
                        </div>
                        <table className='mt-10'>
                            <thead>
                                <tr>
                                    <td>{t.CART.table.product}</td>
                                    <td>{t.CART.table.unitPrice}</td>
                                    <td>{t.CART.table.quantity}</td>
                                    <td>{t.CART.table.intoMoney}</td>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Bikini</td>
                                    <td>720</td>
                                    <td>2</td>
                                    <td>140</td>
                                </tr>
                            </tbody>
                        </table>
                        <div
                            style={{ textAlign: 'right' }}
                            className='mt-5 fs-20 fw-500'
                        >{t.CART.totalPrice}: <span className='g-color-blue'>{func.convertNumber('1000')}$</span></div>
                    </Col>
                    <Col span={24} className="mt-20 fs-20 fw-500 g-color-red text-align-center">
                        <LikeOutlined /> &nbsp;{t.CART.content}!!!
                    </Col>
                    <Row className="mt-20">
                        <Col span={11}>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                <Form.Item
                                    label={t.CART.form.fullname}
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input
                                        className='custom-input'
                                        prefix={<UserOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={t.CART.form.phone}
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input
                                        className='custom-input'
                                        prefix={<PhoneOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={t.CART.form.address}
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                    <TextArea
                                        className='custom-input'
                                        rows={3}
                                        placeholder="maxLength is 6"
                                        maxLength={4}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={t.CART.form.totalPurchase}
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your cast!' }]}
                                >
                                    <Input
                                        className='custom-input'
                                        type={'number'}
                                        prefix={<PoundOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" className='btn-confirm'>
                                        {t.CART.submit}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <div className="modal-infomation">
                                <div className='title' style={{ textAlign: 'left' }}>THÔNG TIN CHỦ CỬA HÀNG</div>
                                <Timeline>
                                    <Timeline.Item color="green">{t.MODAL_INFO.fullname}:&nbsp;&nbsp;<span className="fw-500 g-color-blue-black">{'Lê Viết Khang'}</span></Timeline.Item>
                                    <Timeline.Item color="green">
                                        {t.MODAL_INFO.accountNumber}:&nbsp;&nbsp;
                                        <span className="fw-500 g-color-blue-black">{'038005888678'}</span> <br />
                                        <div style={{ marginLeft: 20 }}>
                                            {t.MODAL_INFO.nameOfBank}:&nbsp;&nbsp;
                                            <span className="fw-500 g-color-blue-black">{'VietComBank'}</span> <br />
                                            {t.MODAL_INFO.accountName}:&nbsp;&nbsp;
                                            <span className="fw-500 g-color-blue-black">{'Lê Viết Khang'}</span> <br />
                                            {t.MODAL_INFO.branchName}:&nbsp;&nbsp;
                                            <span className="fw-500 g-color-blue-black">{'Nam Kỳ Khởi Nghĩa - Quận 1 - TPHCM'}</span> <br />
                                        </div>
                                    </Timeline.Item>
                                    <Timeline.Item color="green">{t.MODAL_INFO.address}:&nbsp;&nbsp;<span className="fw-500 g-color-blue-black">{'3 Lê Văn Huân - Tân Bình - TPHCM'}</span></Timeline.Item>
                                </Timeline>
                                <SoundOutlined />&nbsp;<i>{t.CART.warning}!!! </i>
                            </div>
                        </Col>
                    </Row>

                </Col>
            </Row >
        </div >

    )
}

export default Cart;