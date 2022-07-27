import React, { useCallback, useEffect, useMemo, useState } from 'react'
import HeaderComponent from '../components/header'
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Popconfirm,
  Space,
  Select
} from 'antd'
import {
  ShoppingOutlined,
  LikeOutlined,
  PhoneOutlined,
  UserOutlined,
  DeleteOutlined,
  PlusCircleFilled,
  MinusCircleFilled
} from '@ant-design/icons'
import func from '../utils/func'
import { countries } from '../utils/countries'
import cities from '../utils/city_data'
import provinces from '../utils/provinces.pl'
import { useDispatch, useSelector } from 'react-redux'
import { getLanguage } from '../utils/laguage'
import { Actions as ActionCart } from '../redux/reducers/cart'
import { Actions as ActionOrder } from '../redux/reducers/order'
import { useRouter } from 'next/router'
import _ from 'lodash'
import Link from 'next/link'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

const { TextArea } = Input
const { Option } = Select

function Cart() {
  const { locale } = useRouter()
  const router = useRouter()
  const t = getLanguage()
  const [countItems, setCountItems] = useState([])
  const [optionPay, setOptionPay] = useState(0)
  const [national, setNational] = useState('Poland')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [infomation, setInfomation] = useState({
    shippingAddress: '',
    userName: '',
    phone: null,
    shippingCompany: null,
    zipCode: ''
  })
  const dispatch = useDispatch()
  const { carts } = useSelector((item) => item.cart)
  const { isFetching, orderId, shipingCompany } = useSelector(
    (item) => item.order
  )

  const provinceOptions = useMemo(() => {
    if (national == 'Poland') {
      return provinces
    }
    return []
  }, [national])

  const cityOptions = useMemo(() => {
    if (!province) {
      return []
    }
    return cities[province]
  }, [province])

  useEffect(() => {
    const cartsSult = func.getCartCurrent()
    function loadData() {
      if (!_.isEmpty(cartsSult)) {
        dispatch(ActionCart.loadCart(cartsSult))
      }
      dispatch(ActionOrder.shipingCompanyRequest())
    }
    loadData()
  }, [])

  useEffect(() => {
    if (!_.isEmpty(shipingCompany)) {
      if (shipingCompany[0].id) {
        onChange('shippingCompany', shipingCompany[0].id)
      }
    }
  }, [shipingCompany])

  useEffect(() => {
    if (!_.isEmpty(carts)) {
      setCountItems(carts)
    } else {
      setCountItems([])
    }
  }, [carts])

  const onQuantityChange = (item, isInc) => {
    if (isInc) {
      setCountItems(
        countItems.map((i) => {
          if (i.id == item.id) {
            return {
              ...i,
              quantity: i.quantity + 1
            }
          }
        })
      )
    } else {
      if (countItems.find((i) => i.id == item.id)?.quantity - 1 == 0) {
        setCountItems(countItems.filter((i) => i.id != item.id))
      } else {
        setCountItems(
          countItems.map((i) => {
            if (i.id == item.id) {
              return {
                ...i,
                quantity: i.quantity - 1
              }
            }
          })
        )
      }
    }
  }

  useEffect(() => {
    if (orderId) {
      router.push(`order-result/${orderId}`)
    }
  }, [orderId])
  const totalPrice = useCallback(() => {
    let sum = countItems.reduce(
      (partialSum, a) =>
        partialSum + parseFloat(a.price) * a.quantity * a.itemQuantity,
      0
    )
    sum =
      sum +
      parseInt(
        shipingCompany.find((item) => item.id === infomation.shippingCompany)
          ?.price || 0
      )
    return sum
  }, [countItems, infomation.shippingCompany, optionPay])

  const onChange = (name, value) => {
    setInfomation({
      ...infomation,
      [name]: value
    })
  }
  const fetchApi = useCallback(
    _.debounce(() => {
      const data = {
        products: countItems,
        ...{
          ...infomation,
          shippingAddress: `${infomation.shippingAddress}, ${city}, ${province}, ${infomation.zipCode}, ${national}`,
          shippingCompany: infomation.shippingCompany,
          total: func.convertNumber(totalPrice())
        }
      }
      console.log(data)
      dispatch(ActionOrder.postOrderRequest(data))
    }, 300),
    [infomation, countItems]
  )

  const onSubmit = () => {
    if (!_.isEmpty(countItems)) {
      fetchApi()
    }
  }

  const onChangeRadio = (event) => {
    setOptionPay(event.target.value)
  }

  const onChangeNational = (event) => {
    setNational(event)
  }

  const onChangeProvince = (event) => {
    setProvince(event)
  }

  const onChangeCity = (event) => {
    setCity(event)
  }

  return (
    <div className={styles.container}>
      <div
        className="flex-align-center"
        style={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <div className="main-header">
          <HeaderComponent />
        </div>
        <Row style={{ width: '100%' }}>
          <Col sm={6} xs={0} />
          <Col sm={12} xs={24}>
            <Col span={24} className="table-cart mt-10">
              <div>
                <ShoppingOutlined
                  style={{ color: 'rgb(5, 112, 218)', fontSize: 20 }}
                />
                &nbsp;
                <span style={{ fontSize: 18 }}>
                  {t.CART.yourCart} ({countItems.length} {t.CART.products})
                </span>
              </div>
              <table className="mt-10">
                <thead>
                  <tr>
                    <td>
                      <b>{t.CART.table.product}</b>
                    </td>
                    <td>
                      <b>{t.CART.table.unitPrice}</b>
                    </td>
                    <td>
                      <b>{t.CART.table.quantity}</b>
                    </td>
                    <td>
                      <b>{t.CART.table.intoMoney}</b>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {!_.isEmpty(countItems) ? (
                    countItems.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          {item?.name[locale]} (size: {item.size})
                        </td>
                        <td>{`${item?.price} ${
                          item.itemQuantity ? `(x${item.itemQuantity})` : `(x1)`
                        }`}</td>
                        <td
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          {item.quantity}
                          <div>
                            <PlusCircleFilled
                              onClick={() => onQuantityChange(item, true)}
                              style={{ marginRight: '5px', cursor: 'pointer' }}
                            />
                            <MinusCircleFilled
                              onClick={() => onQuantityChange(item, false)}
                              style={{ cursor: 'pointer' }}
                            />
                          </div>
                        </td>
                        <td>
                          {func.convertNumber(
                            parseFloat(item.price | 0) *
                              item.itemQuantity *
                              item.quantity
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <Popconfirm
                            title="Are you sure to delete this product?"
                            onConfirm={() => {
                              dispatch(ActionCart.removeFromCart(idx))
                            }}
                            onCancel={() => {}}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined
                              style={{
                                color: 'red',
                                cursor: 'pointer',
                                fontSize: 16
                              }}
                            />
                          </Popconfirm>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <Link href="/">{t.CART.empty}</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Col>
            <Col
              span={24}
              className="mt-20 fs-20 fw-500 g-color-red text-align-center"
            >
              <LikeOutlined /> &nbsp;{t.CART.content}!!!
            </Col>
            <Row className="mt-20" style={{ padding: '1em' }}>
              <Col sm={12} xs={24}>
                {/* <div className="fw-600">{t.CART.paymentMethod}</div>
                                <Radio.Group value={optionPay} onChange={onChangeRadio}>
                                    <Space direction="vertical">
                                        <Radio value={0}>{t.CART.prepay}
                                            {optionPay === 0 && <div>
                                                <span>{t.MODAL_INFO.accountNumber}:</span>
                                                <span className='g-color-blue-black fw-600' style={{ marginLeft: 10 }}>{'89109016940000000141550078'}</span>
                                            </div>}
                                        </Radio>
                                        <Radio value={1}>{t.CART.postpaid}</Radio>
                                    </Space>
                                </Radio.Group> */}
                <div>
                  <span>{t.CART.shippingCompany}</span>
                  <Select
                    value={infomation.shippingCompany}
                    style={{ width: 200, marginLeft: 10 }}
                    onChange={(e) => onChange('shippingCompany', e)}
                  >
                    {(shipingCompany || []).map((item) => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.name || ''}
                        </Option>
                      )
                    })}
                  </Select>
                </div>
                <div className="mt-5 fs-20 fw-500 mt-20">
                  {t.CART.totalPrice}:{' '}
                  <span className="g-color-blue">
                    {func.convertNumber(totalPrice())} PLZ
                  </span>
                </div>
              </Col>
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
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!'
                      }
                    ]}
                  >
                    <Input
                      className="custom-input"
                      prefix={<UserOutlined />}
                      value={infomation.userName}
                      onChange={(e) => onChange('userName', e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t.CART.form.phone}
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number!'
                      }
                    ]}
                  >
                    <Input
                      className="custom-input"
                      prefix={<PhoneOutlined />}
                      value={infomation.phone}
                      onChange={(e) => onChange('phone', e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t.CART.national}
                    name="international"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your Country!'
                      }
                    ]}
                  >
                    <Select
                      optionFilterProp="children"
                      showSearch
                      value={national}
                      onChange={onChangeNational}
                    >
                      {countries.map((country) => (
                        <Option key={country.name} value={country.name}>
                          {country.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={t.CART.province}
                    name="province"
                    rules={[
                      {
                        required: true,
                        message: 'This is required!'
                      }
                    ]}
                  >
                    <Select
                      optionFilterProp="children"
                      showSearch
                      value={province}
                      onChange={onChangeProvince}
                    >
                      {provinceOptions.map((p) => (
                        <Option key={p} value={p}>
                          {p}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={t.CART.city}
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: 'This is required!'
                      }
                    ]}
                  >
                    <Select
                      optionFilterProp="children"
                      showSearch
                      value={city}
                      onChange={onChangeCity}
                    >
                      {cityOptions.map((c) => (
                        <Option key={c} value={c}>
                          {c}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={t.CART.zipcode}
                    name="zipCode"
                    rules={[
                      {
                        required: true,
                        message: 'This is required!'
                      }
                    ]}
                  >
                    <Input
                      className="custom-input"
                      value={infomation.zipCode}
                      onChange={(e) => onChange('zipCode', e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t.CART.form.address}
                    name="shippingAddress"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your address!'
                      }
                    ]}
                  >
                    <TextArea
                      className="custom-input"
                      rows={3}
                      placeholder="Your address"
                      value={infomation.shippingAddress}
                      onChange={(e) =>
                        onChange('shippingAddress', e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{ sm: { offset: 8, span: 16 } }}
                    style={{ textAlign: 'right' }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-confirm"
                      loading={isFetching}
                    >
                      {t.CART.submit}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}

export default Cart
