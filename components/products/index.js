import React, { useEffect, useState } from 'react';
import { Breadcrumb, Row, Col, Select, Checkbox, Collapse } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { Actions } from '../../redux/reducers/product'
import Category from '../category'
import { useRouter } from "next/router";
import _ from 'lodash'

const { Option } = Select;
const { Panel } = Collapse;

const COLOR_CONFIGS = [
    {
        _id: 'black',
        name: 'black',
        attribute: 'g-background-black'
    },
    {
        _id: 'yellow',
        name: 'yellow',
        attribute: 'g-background-yellow'
    },
    {
        _id: 'green',
        name: 'green',
        attribute: 'g-background-green'
    },
    {
        _id: 'blue',
        name: 'blue',
        attribute: 'g-background-blue'
    },
    ,
    {
        _id: 'red',
        name: 'red',
        attribute: 'g-background-red'
    }
]

function Products() {
    const { locale } = useRouter();
    const [productsSort, setProductSort] = useState([])
    const [arrCatrgories, setArrCatrgories] = useState([])
    const [optionSort, setOptionSort] = useState(0)
    const { products } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        setProductSort(products)
    }, [products])

    useEffect(() => {
        function loadHandleCategories() {
            if (categories.length > 0) {
                const processed = categories.reduce((acc, curr) => {
                    if (!curr.parent) {
                        if (!acc[curr.id]) {
                            acc[curr.id] = curr
                        }
                    } else {
                        if (!acc[curr.parent.id]) {
                            acc[curr.parent.id] = {
                                ...curr.parent,
                                children: [curr]
                            }
                        } else {
                            if (!acc[curr.parent.id].children) {
                                acc[curr.parent.id] = {
                                    ...acc[curr.parent.id],
                                    children: [curr]
                                }
                            } else {
                                acc[curr.parent.id].children.push(curr)
                            }
                        }
                    }
                    return acc
                }, {})
                setArrCatrgories(Object.values(processed))
            }
        }
        loadHandleCategories()
    }, [categories])

    const handleChange = (value) => {
        if (products && products.length > 0) {
            if (value === 1) {
                setProductSort(_.orderBy(products, 'price', 'asc'))
            }
            if (value === 2) {
                setProductSort(_.orderBy(products, 'price', 'desc'))
            }
            if (value === 0) {
                setProductSort(products)
            }
        }
        setOptionSort(value)
    }

    const onFilterProduct = () => {
        console.log("vào đây")
        dispatch(Actions.getProductFiltersRequest({ color: ['red'] }))
    }

    return (
        <div className='wrapper-product-container'>
            <div className='banner-content'>
                <div className='content-text'>
                    TẤT CẢ SẢN PHẨM
                </div>
                <Breadcrumb>
                    <Breadcrumb.Item>Trag chủ</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a>Tất cả sản phẩm</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='container' style={{ marginTop: '4em' }}>
                <Row>
                    <Col span={6} style={{ paddingRight: 25 }}>
                        <div className='fs-18 fw-600'>
                            DANH MỤC
                        </div>
                        <Collapse
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <LeftOutlined rotate={isActive ? -90 : 0} />}
                            ghost
                            expandIconPosition="end"
                        >

                            {(arrCatrgories || []).map(item => {
                                return <Panel key={item.id} header={item.name[locale]} className="fs-18 fw-500 parent-collaps ">
                                    {
                                        item.children && _.isArray(item.children)
                                        && item.children.map(chil => {
                                            return (
                                                <p key={chil.id} className="fs-16 fw-400 item-collaps">{chil.name[locale]}</p>
                                            )
                                        })
                                    }
                                </Panel>
                            })
                            }

                        </Collapse>
                        <div className='fs-18 fw-600 mt-30'>
                            THEO KÍCH THƯỚC
                        </div>
                        <div className='mt-20'>
                            <Checkbox.Group style={{ width: '100%' }} >
                                <Row gutter={[0, 10]}>
                                    <Col span={12}>
                                        <Checkbox value="A">S</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="B">L</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="M">M</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="XL">XL</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                        <div className='fs-18 fw-600 mt-30'>
                            THEO MÀU SẮC
                        </div>
                        <div className='mt-20 group-color'>
                            {COLOR_CONFIGS.map(item => {
                                return <div onClick={onFilterProduct} key={item._id} className={`item-color ${item.attribute}`} />
                            })}
                        </div>
                    </Col>
                    <Col span={18}>
                        <div className='flex-center-right'>
                            Sắp xếp theo giá
                            <Select className='custom-select-sort' style={{ width: 180 }} value={optionSort} onChange={handleChange}>
                                <Option value={0}>Mặc đinh</Option>
                                <Option value={1}>Từ thấp đến cao</Option>
                                <Option value={2}>Từ cao tới thấp</Option>
                            </Select>
                        </div>
                        <div className='border-bottom-width' />
                        <Row gutter={[30, 45]}>
                            {
                                (productsSort || []).map((item, idx) => {
                                    return <Col sm={8} xs={24} key={item.id}>
                                        <Category data={idx % 2 === 0 ? item : {
                                            ...item,
                                            image: [
                                                'https://product.hstatic.net/1000329192/product/upload_417931e07fbc4adda593b39aca66d405_grande.jpg'
                                            ]
                                        }} />
                                    </Col>
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default Products;