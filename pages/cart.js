import React, { useCallback, useEffect, useState } from 'react'
import HeaderComponent from '../components/header'
import { Row, Col, Timeline, Form, Input, Button, message, Popconfirm } from 'antd'
import {
    ShoppingOutlined,
    LikeOutlined,
    PhoneOutlined,
    UserOutlined,
    PoundOutlined,
    SoundOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import func from '../utils/func'
import { useDispatch, useSelector } from 'react-redux'
import { getLanguage } from '../utils/laguage'
import { Actions as ActionCart } from '../redux/reducers/cart'
import { Actions as ActionOrder } from '../redux/reducers/order'
import { useRouter } from "next/router";
import _ from 'lodash'
import Link from 'next/link'

const { TextArea } = Input;

function Cart() {
    const { locale } = useRouter()
    const router = useRouter()
    const t = getLanguage()
    const [countItems, setCountItems] = useState([])
    const [infomation, setInfomation] = useState({
        shippingAddress: '',
        userName: '',
        phone: null
    })

    const dispatch = useDispatch()
    const {
        carts,
    } = useSelector(item => item.cart)
    const {
        isFetching,
        orderId
    } = useSelector(item => item.order)

    useEffect(() => {
        const cartsSult = func.getCartCurrent()
        function loadData() {
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

    useEffect(() => {
        if (orderId) {
            router.push(`order-result/${orderId}`)
        }
    }, [orderId])

    const totalPrice = useCallback(() => {
        const sum = countItems.reduce((partialSum, a) => partialSum + parseFloat(a.price) * a.quantity, 0)
        return sum;
    }, [countItems])

    const onChange = (name, value) => {
        setInfomation({
            ...infomation,
            [name]: value
        })
    }

    const fetchApi = useCallback(_.debounce(() => {
        const data = {
            products: countItems,
            ...infomation
        }
        dispatch(ActionOrder.postOrderRequest(data))
    }, 300), [infomation, countItems])

    const onSubmit = () => {
        if (!_.isEmpty(countItems)) {
            fetchApi()
        }
    }

    return (
        <div className='flex-align-center' style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div className='main-header'>
                <HeaderComponent />
            </div>
            <Row style={{ width: '100%' }}>
                <Col sm={6} xs={0} />
                <Col sm={12} xs={24}>
                    <Col span={24} className='table-cart mt-10'>
                        <div>
                            <ShoppingOutlined style={{ color: 'rgb(5, 112, 218)', fontSize: 20 }} />
                            &nbsp;<span style={{ fontSize: 18 }}>{t.CART.yourCart} ({countItems.length} {t.CART.products})</span>
                        </div>
                        <table className='mt-10'>
                            <thead>
                                <tr>
                                    <td><b>{t.CART.table.product}</b></td>
                                    <td><b>{t.CART.table.unitPrice}</b></td>
                                    <td><b>{t.CART.table.quantity}</b></td>
                                    <td><b>{t.CART.table.intoMoney}</b></td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    !_.isEmpty(countItems) ?
                                        countItems.map((item, idx) => <tr key={idx}>
                                            <td>{item?.name[locale]} (size: {item.size}, color: <span style={{ color: item.color }}>{item.color}</span>)</td>
                                            <td>{item?.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{func.convertNumber(parseFloat(item.price | 0) * item.quantity)}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Popconfirm
                                                    title="Are you sure to delete this product?"
                                                    onConfirm={() => { dispatch(ActionCart.removeFromCart(idx)) }}
                                                    onCancel={() => { }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 16 }} />
                                                </Popconfirm>
                                            </td>
                                        </tr>)
                                        : <tr>
                                            <td>
                                                <Link href="/">{t.CART.empty}</Link>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        <div
                            style={{ textAlign: 'right' }}
                            className='mt-5 fs-20 fw-500'
                        >{t.CART.totalPrice}: <span className='g-color-blue'>{func.convertNumber(totalPrice())} PLZ</span></div>
                    </Col>
                    <Col span={24} className="mt-20 fs-20 fw-500 g-color-red text-align-center">
                        <LikeOutlined /> &nbsp;{t.CART.content}!!!
                    </Col>
                    <Row className="mt-20">
                        <Col sm={6} xs={0} />
                        <Col sm={12} xs={24}>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                onFinish={onSubmit}
                            >
                                <Form.Item
                                    label={t.CART.form.fullname}
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input
                                        className='custom-input'
                                        prefix={<UserOutlined />}
                                        value={infomation.userName}
                                        onChange={(e) => onChange('userName', e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={t.CART.form.phone}
                                    name="phone"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input
                                        className='custom-input'
                                        prefix={<PhoneOutlined />}
                                        value={infomation.phone}
                                        onChange={(e) => onChange('phone', e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={t.CART.form.address}
                                    name="shippingAddress"
                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                    <TextArea
                                        className='custom-input'
                                        rows={3}
                                        placeholder="Your address"
                                        value={infomation.shippingAddress}
                                        onChange={(e) => onChange('shippingAddress', e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ sm: { offset: 8, span: 16 } }} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" className='btn-confirm' loading={isFetching}
                                    >
                                        {t.CART.submit}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>

                </Col>
            </Row >
        </div >

    )
}

export default Cart;