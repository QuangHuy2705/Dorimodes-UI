import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Row, Col, Timeline } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import Infomation from '../modal/Infomation'

function HeaderComponent() {
    const [isVisible, setVisible] = useState(false)
    const openInfomation = () => {
        setVisible(true)
    }

    const closeModalInfo = () => {
        setVisible(false)
    }

    const renderInfo = () => {
        return (
            <div className="modal-infomation">
                <div className='title'>THÔNG TIN CHỦ CỬA HÀNG</div>
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
        )
    }

    return (
        <Row className='bikini-header'>
            <Infomation
                isVisible={isVisible}
                onClose={closeModalInfo}
                render={renderInfo()}
            />
            <Col span={5} />
            <Col span={3}>
                <Image alt="" src='/images/logo.png' width={100} height={30} quality={100} />
            </Col>
            <Col span={12}>
                <nav>
                    <ul>
                        <li style={{ display: 'inline-block' }}>
                            <Link href="/">
                                <a>HOME</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <a>CATEGORY 1</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog/hello-world">
                                <a>CATEGORY 2</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog/hello-world">
                                <a>CATEGORY 3</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Col>
            <Col span={2}>
                <UserOutlined className="cart-header" onClick={openInfomation} />
                <Link href="/cart">
                    <ShoppingCartOutlined className="cart-header ml-15" />
                </Link>

            </Col>
        </Row>
    )
}

export default HeaderComponent