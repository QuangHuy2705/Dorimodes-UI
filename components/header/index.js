import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Row, Col, Timeline, Badge } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import Infomation from '../modal/Infomation'

import { useSelector, useDispatch } from 'react-redux'
import { Actions } from '../../redux/reducers/product'
import { Actions as ActionCategory } from '../../redux/reducers/category'
import { Actions as ActionCart } from '../../redux/reducers/cart'

import { useRouter } from "next/router";
import { getLanguage } from '../../utils/laguage'
import func from '../../utils/func'
import _ from 'lodash'

function HeaderComponent() {
    const t = getLanguage();
    const { locale, locales, asPath } = useRouter();
    const [countItems, setCountItems] = useState([])
    const [isVisible, setVisible] = useState(false)

    const dispatch = useDispatch()
    const {
        carts
    } = useSelector(item => item.cart)

    useEffect(() => {
        const cartsSult = func.getCartCurrent()
        function loadData() {
            dispatch(Actions.getProductRequest())
            dispatch(ActionCategory.getCategoryRequest())
            if (!_.isEmpty(cartsSult)) {
                dispatch(ActionCart.loadCart(cartsSult))
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (!_.isEmpty(carts)) {
            setCountItems(carts)
        } else {
            setCountItems([])
        }
    }, [carts])

    const openInfomation = () => {
        setVisible(true)
    }

    const closeModalInfo = () => {
        setVisible(false)
    }

    const renderInfo = () => {
        return (
            <div className="modal-infomation">
                <div className='title'>{t.MODAL_INFO.title}</div>
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
                <Link href="/">
                    <Image style={{ cursor: 'pointer' }} alt="" src='/images/logo.png' width={100} height={30} quality={100} />
                </Link>
            </Col>
            <Col sm={12} xs={24}>
                <nav>
                    <ul>
                        <li style={{ display: 'inline-block' }}>
                            <Link href="/">
                                {t.HOME.home}
                            </Link>
                        </li>
                        <li>
                            <Link href="/products">
                                {t.HOME.products}
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                {t.HOME.aboutUs}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Col>
            <Col sm={2} xs={16}>
                <UserOutlined className="cart-header" onClick={openInfomation} />
                <Link href="/cart">
                    <Badge count={!_.isEmpty(countItems) ? countItems.length : null} overflowCount={9}>
                        <ShoppingCartOutlined className="cart-header ml-15" />
                    </Badge>
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