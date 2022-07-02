import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Row, Col, Timeline } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import Infomation from '../modal/Infomation'

import { useSelector, useDispatch } from 'react-redux'
import { Actions } from '../../redux/reducers/product'
import { Actions as ActionCategory } from '../../redux/reducers/category'

import { useRouter } from "next/router";
import en from '../../locales/en'
import vn from '../../locales/vn'

function HeaderComponent() {
    const { locale, locales, asPath } = useRouter();
    const t = locale === 'en' ? en : vn;

    const [isVisible, setVisible] = useState(false)
    const openInfomation = () => {
        setVisible(true)
    }

    const closeModalInfo = () => {
        setVisible(false)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        function getData() {
            dispatch(Actions.getProductRequest())
            dispatch(ActionCategory.getCategoryRequest())
        }
        getData()
    }, [])

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
            <Col sm={2} xs={0} />
            <Col sm={3} xs={24}>
                <Image alt="" src='/images/logo.png' width={100} height={30} quality={100} />
            </Col>
            <Col sm={12} xs={24}>
                <nav>
                    <ul>
                        <li style={{ display: 'inline-block' }}>
                            <Link href="/">
                                {t.home}
                            </Link>
                        </li>
                        <li>
                            <Link href="/products">
                                {t.category}
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog/hello-world">
                                VỀ CHÚNG TÔI
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Col>
            <Col sm={2} xs={16}>
                <UserOutlined className="cart-header" onClick={openInfomation} />
                <Link href="/cart">
                    <ShoppingCartOutlined className="cart-header ml-15" />
                </Link>
            </Col>
            <Col sm={4} xs={8}>
                <div className="navbar">
                    {locales.map((l, i) => {
                        return (
                            <span key={i} className={l === locale ? "selected" : ""}>
                                <Link href={asPath} locale={l}>
                                    {l}
                                </Link>
                            </span>
                        );
                    })}
                </div>
            </Col>
        </Row>
    )
}

export default HeaderComponent