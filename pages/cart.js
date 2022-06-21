import React, { useEffect } from 'react'
import HeaderComponent from '../components/header'
import { Row, Col, Timeline } from 'antd'
import { ShoppingCartOutlined, LikeOutlined } from '@ant-design/icons'
import func from '../utils/func'

function Cart() {
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
                            <ShoppingCartOutlined style={{ color: 'rgb(5, 112, 218)', fontSize: 20 }} /> <span style={{ fontSize: 18 }}>Giỏ hàng của bạn ({'5'} sản phẩm)</span>
                        </div>
                        <table className='mt-10'>
                            <thead>
                                <tr>
                                    <td>SẢN PHẨM</td>
                                    <td>ĐƠN GIÁ</td>
                                    <td>SỐ LƯỢNG</td>
                                    <td>THÀNH TIỀN</td>
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
                        >Tổng tiền: <span className='g-color-blue'>{func.convertNumber('1000')}$</span></div>
                    </Col>
                    <Col span={24} className="mt-20 fs-20 fw-500 g-color-red">
                        <LikeOutlined /> &nbsp;Vui lòng thanh toán để được thực hiện!!!
                    </Col>
                    <Col span={24} className="mt-20">
                        <div className="modal-infomation">
                            <div className='title' style={{ textAlign: 'left' }}>THÔNG TIN CHỦ CỬA HÀNG</div>
                            <Timeline>
                                <Timeline.Item color="green">Họ và tên:&nbsp;&nbsp;<span className="fw-500 g-color-blue-black">{'Lê Viết Khang'}</span></Timeline.Item>
                                <Timeline.Item color="green">
                                    Số tài khoản:&nbsp;&nbsp;
                                    <span className="fw-500 g-color-blue-black">{'038005888678'}</span> <br />
                                    <div style={{ marginLeft: 20 }}>
                                        Ngân hàng:&nbsp;&nbsp;
                                        <span className="fw-500 g-color-blue-black">{'VietComBank'}</span> <br />
                                        Tên chủ tài khoản:&nbsp;&nbsp;
                                        <span className="fw-500 g-color-blue-black">{'Lê Viết Khang'}</span> <br />
                                        Chi nhánh:&nbsp;&nbsp;
                                        <span className="fw-500 g-color-blue-black">{'Nam Kỳ Khởi Nghĩa - Quận 1 - TPHCM'}</span> <br />
                                    </div>
                                </Timeline.Item>
                                <Timeline.Item color="green">Địa chỉ:&nbsp;&nbsp;<span className="fw-500 g-color-blue-black">{'3 Lê Văn Huân - Tân Bình - TPHCM'}</span></Timeline.Item>
                            </Timeline>
                        </div>
                    </Col>
                </Col>
            </Row >
        </div >

    )
}

export default Cart;