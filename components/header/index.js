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

import { useRouter } from 'next/router'
import { getLanguage } from '../../utils/laguage'
import func from '../../utils/func'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import _ from 'lodash'

function HeaderComponent() {
  const t = getLanguage()
  const { locale, locales, asPath } = useRouter()
  const [countItems, setCountItems] = useState([])
  const [isVisible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const { carts } = useSelector((item) => item.cart)

  useEffect(() => {
    const cartsSult = func.getCartCurrent()
    function loadData() {
      dispatch(Actions.getProductRequest())
      dispatch(ActionCategory.getCategoryRequest())
      dispatch(ActionCategory.getSizeRequest())
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
        <div className="title">{t.MODAL_INFO.title}</div>
        <Timeline>
          <Timeline.Item color="green">
            {t.MODAL_INFO.fullname}:&nbsp;&nbsp;
            <span className="fw-500 g-color-blue-black">{'Dung Nguyen'}</span>
          </Timeline.Item>
          <Timeline.Item color="green">
            {t.CART.form.phone}:&nbsp;&nbsp;
            <span className="fw-500 g-color-blue-black">{'+48 579172183'}</span>
          </Timeline.Item>
          <Timeline.Item color="green">
            {t.CART.form.phone}:&nbsp;&nbsp;
            <span className="fw-500 g-color-blue-black">{'729547602'}</span>
          </Timeline.Item>
          <Timeline.Item color="green">
            {t.CART.form.facebook}:&nbsp;&nbsp;
            <a href="https://www.facebook.com/DorimodesDQHL" target="_blank">
              Dorimodes
            </a>
          </Timeline.Item>

          {/* <Timeline.Item color="green"> */}
          {/* {t.MODAL_INFO.accountNumber}:&nbsp;&nbsp;
                        <span className="fw-500 g-color-blue-black">{'89109016940000000141550078'}</span> <br /> */}
          {/* <div style={{ marginLeft: 20 }}>
                            {t.MODAL_INFO.nameOfBank}:&nbsp;&nbsp;
                            <span className="fw-500 g-color-blue-black">{'SANTANDER'}</span> <br />
                            {t.MODAL_INFO.accountName}:&nbsp;&nbsp;
                            <span className="fw-500 g-color-blue-black">{'Lê Viết Khang'}</span> <br />
                            {t.MODAL_INFO.branchName}:&nbsp;&nbsp;
                            <span className="fw-500 g-color-blue-black">{'Nam Kỳ Khởi Nghĩa - Quận 1 - TPHCM'}</span> <br />
                        </div> */}
          {/* </Timeline.Item> */}
          {/* <Timeline.Item color="green">{t.MODAL_INFO.address}:&nbsp;&nbsp;<span className="fw-500 g-color-blue-black">{'3 Lê Văn Huân - Tân Bình - TPHCM'}</span></Timeline.Item> */}
        </Timeline>
      </div>
    )
  }

  return (
    <Row className="bikini-header">
      <Infomation
        isVisible={isVisible}
        onClose={closeModalInfo}
        render={renderInfo()}
      />
      <Col className="logo-container" md={3} sm={24} xs={0}>
        <Link href="/">
          <Image
            style={{ cursor: 'pointer' }}
            alt=""
            src="/images/logo1.png"
            width={100}
            height={100}
            quality={100}
          />
        </Link>
      </Col>
      <Col md={12} sm={14} xs={11}>
        <nav>
          <ul>
            <li style={{ display: 'inline-block', marginLeft: 0 }}>
              <Link href="/">{t.HOME.home}</Link>
            </li>
            <li>
              <Link href="/products">{t.HOME.products}</Link>
            </li>
            <li>
              <Link href="/about">{t.HOME.aboutUs}</Link>
            </li>
          </ul>
        </nav>
      </Col>
      <Col
        lg={2}
        md={4}
        sm={8}
        style={{ textAlign: 'right', display: 'flex', alignItems: 'center' }}
      >
        <UserOutlined className="cart-header" onClick={openInfomation} />
        <Link href="/cart">
          <Badge
            count={!_.isEmpty(countItems) ? countItems.length : null}
            overflowCount={9}
          >
            <ShoppingCartOutlined className="cart-header ml-15" />
          </Badge>
        </Link>
        <div className="navbar">
          {locales.map((l, i) => {
            return (
              <span key={i} className={l === locale ? 'selected' : ''}>
                <Link href={asPath} locale={l}>
                  {l}
                </Link>
              </span>
            )
          })}
        </div>
      </Col>
      {/* <Col lg={5} md={4} xs={24}>

            </Col> */}
    </Row>
  )
}

export default HeaderComponent
