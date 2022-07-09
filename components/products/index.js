import React, { useEffect, useState } from 'react';
import { Breadcrumb, Row, Col, Select, Checkbox, Collapse, Empty, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { Actions } from '../../redux/reducers/product'
import Category from '../category'
import { useRouter } from "next/router";
import { getLanguage } from '../../utils/laguage';
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
    const t = getLanguage();
    const { locale } = useRouter();
    const [productsSort, setProductSort] = useState([])
    const [arrCatrgories, setArrCatrgories] = useState([])
    const [filters, setFilters] = useState({
        color: [],
        size: [],
        category: []
    })
    const [optionSort, setOptionSort] = useState(0)
    const { products, isFetching } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        setProductSort(products)
    }, [products])

    useEffect(() => {
        function loadHandleCategories() {
            if (categories && categories.length > 0) {
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

    const handleSortChange = (value) => {
        if (products && products.length > 0) {
            if (value === 1) {
                setProductSort(_.orderBy(products, (o) => parseFloat(o.price), ['asc']))
            }
            if (value === 2) {
                setProductSort(_.orderBy(products, (o) => parseFloat(o.price), ['desc']))
            }
            if (value === 0) {
                setProductSort(products)
            }
        }
        setOptionSort(value)
    }

    const filterWithCategory = (idCat) => {
        let tmpCat = filters.category
        if (filters.category.length && filters.category[0] === idCat) {
            tmpCat = []
        } else {
            tmpCat = [idCat]
        }
        setFilters({
            ...filters,
            category: tmpCat
        })
        callApiFilters({
            ...filters,
            category: tmpCat
        })
    }

    const onFilterProduct = (idColor) => {
        let tmpColors = filters.color;
        if (filters.color.includes(idColor)) {
            tmpColors = filters.color.filter(item => item !== idColor)
        } else {
            tmpColors = [...filters.color, idColor]
        }
        setFilters({
            ...filters,
            color: tmpColors
        })
        callApiFilters({
            ...filters,
            color: tmpColors
        })
    }

    const onFilterSize = (listSize) => {
        setFilters({
            ...filters,
            size: listSize
        })
        callApiFilters({
            ...filters,
            size: listSize
        })
    }

    const callApiFilters = (params) => {
        dispatch(Actions.getProductFiltersRequest(params))
    }

    return (
        <div className='wrapper-product-container'>
            <div className='banner-content'>
                <div className='content-text'>
                    {t.PRODUCTS.allProductsTitle}
                </div>
                <Breadcrumb>
                    <Breadcrumb.Item>{t.PRODUCTS.home}</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a>{t.PRODUCTS.allProducts}</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='container' style={{ marginTop: '4em' }}>
                <Row>
                    <Col span={6} style={{ paddingRight: 25 }}>
                        <div className='fs-18 fw-600'>
                            {t.PRODUCTS.category}
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
                                                <p
                                                    onClick={() => filterWithCategory(chil.id)}
                                                    key={chil.id}
                                                    className={`fs-16 fw-400 item-collaps ${!_.isEmpty(filters.category) && filters.category[0] === chil.id ? 'isSelect' : ''}`}>
                                                    {chil.name[locale]}
                                                </p>
                                            )
                                        })
                                    }
                                </Panel>
                            })
                            }
                        </Collapse>
                        <div className='fs-18 fw-600 mt-30'>
                            {t.PRODUCTS.size}
                        </div>
                        <div className='mt-20'>
                            <Checkbox.Group style={{ width: '100%' }} value={filters.size} onChange={onFilterSize}>
                                <Row gutter={[0, 10]}>
                                    <Col span={12}>
                                        <Checkbox value="s">S</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="l">L</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="m">M</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="xl">XL</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                        <div className='fs-18 fw-600 mt-30'>
                            {t.PRODUCTS.color}
                        </div>
                        <div className='mt-20 group-color'>
                            {COLOR_CONFIGS.map(item => {
                                return <div
                                    onClick={() => onFilterProduct(item._id)}
                                    key={item._id}
                                    className={`item-color ${filters.color.includes(item._id) ? 'isChoose' : ''} ${item.attribute}`}

                                />
                            })}
                        </div>
                    </Col>
                    <Col span={18}>
                        <div className='flex-center-right'>
                            {t.PRODUCTS.sortBy}
                            <Select className='custom-select-sort' style={{ width: 180 }} value={optionSort} onChange={handleSortChange}>
                                <Option value={0}>{t.PRODUCTS.default}</Option>
                                <Option value={1}>{t.PRODUCTS.lowToHigh}</Option>
                                <Option value={2}>{t.PRODUCTS.hightToLow}</Option>
                            </Select>
                        </div>
                        <div className='border-bottom-width' />
                        <Spin spinning={isFetching}>
                            <Row gutter={[30, 45]}>
                                {
                                    (productsSort || []).map((item, idx) => {
                                        return <Col sm={8} xs={24} key={item.id}>
                                            <Category data={item} />
                                        </Col>
                                    })
                                }
                            </Row>
                            <div className='text-align-center '> {(!products || products.length === 0) && < Empty />}</div>
                        </Spin>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default Products;