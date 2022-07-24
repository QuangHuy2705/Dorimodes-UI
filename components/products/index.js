import React, { useCallback, useEffect, useState } from 'react'
import {
  Breadcrumb,
  Row,
  Col,
  Select,
  Checkbox,
  Collapse,
  Input,
  List
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Actions } from '../../redux/reducers/product'
import Category from '../category'
import { useRouter } from 'next/router'
import { getLanguage } from '../../utils/laguage'
import _ from 'lodash'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'

const { Option } = Select
const { Panel } = Collapse

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
  const slideImages = [
    {
      url: `/images/background/slider_1.png`
    },
    {
      url: '/images/background/product.jpeg'
    },
    {
      url: '/images/background/slide4.jpeg'
    }
  ]
  const t = getLanguage()
  const { locale } = useRouter()
  const [productsSort, setProductSort] = useState([])
  const [arrCatrgories, setArrCatrgories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    // color: [],
    size: [],
    category: []
  })
  const [optionSort, setOptionSort] = useState(0)
  const [valueSortByName, setSortByName] = useState(null)
  const { products, isFetching } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const { categories, sizes } = useSelector((state) => state.category)

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

  useEffect(() => {
    handleSortChange(optionSort, valueSortByName)
  }, [optionSort, valueSortByName])

  const handleSortChange = (value, valueSortByName = null) => {
    const arrTmp = []
    if (products && products.length > 0) {
      if (value === 1) {
        arrTmp = _.orderBy(products, (o) => parseFloat(o.price), ['asc'])
      }
      if (value === 2) {
        arrTmp = _.orderBy(products, (o) => parseFloat(o.price), ['desc'])
      }
      if (value === 0) {
        arrTmp = products
      }
    }
    if (valueSortByName) {
      arrTmp = arrTmp.filter((item) =>
        item.code.toLowerCase().includes(valueSortByName.toLowerCase())
      )
    }
    setProductSort(arrTmp)
    setCurrentPage(1)
  }

  const handleSortByPrice = (value) => {
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
    let tmpColors = filters.color
    if (filters.color.includes(idColor)) {
      tmpColors = filters.color.filter((item) => item !== idColor)
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
    console.log(listSize, ' listSize')
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

  const onChangePage = (page) => {
    setCurrentPage(page)
  }

  const sortByName = useCallback(
    _.debounce((value) => {
      setSortByName(value)
    }, 300),
    []
  )

  const handleChange = (event) => {
    const { value } = event.target
    sortByName(value)
  }

  return (
    <>
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div
              style={{
                backgroundImage: `url(${slideImage.url})`,
                height: '500px',
                width: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'none',
                backgroundSize: 'cover'
              }}
            ></div>
          </div>
        ))}
      </Slide>
      <div className="wrapper-product-container">
        {/* <div className='background-product mt-0' /> */}
        <div className="banner-content">
          <div className="content-text">{t.PRODUCTS.allProductsTitle}</div>
          <Breadcrumb>
            <Breadcrumb.Item>{t.PRODUCTS.home}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>{t.PRODUCTS.allProducts}</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row
          className="container"
          style={{ marginTop: '4em', paddingLeft: '1em', paddingRight: '1em' }}
        >
          <Col xs={24} sm={6} style={{ paddingRight: 25 }}>
            <div className="fs-18 fw-600">{t.PRODUCTS.category}</div>
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <LeftOutlined rotate={isActive ? -90 : 0} />
              )}
              ghost
              expandIconPosition="end"
            >
              {(arrCatrgories || []).map((item) => {
                return (
                  <Panel
                    key={item.id}
                    header={item.name[locale]}
                    className="fs-18 fw-500 parent-collaps "
                  >
                    {item.children &&
                      _.isArray(item.children) &&
                      item.children.map((chil) => {
                        return (
                          <p
                            onClick={() => filterWithCategory(chil.id)}
                            key={chil.id}
                            className={`fs-16 fw-400 item-collaps ${
                              !_.isEmpty(filters.category) &&
                              filters.category[0] === chil.id
                                ? 'isSelect'
                                : ''
                            }`}
                          >
                            {chil.name[locale]}
                          </p>
                        )
                      })}
                  </Panel>
                )
              })}
            </Collapse>
            <div className="fs-18 fw-600 mt-30">{t.PRODUCTS.size}</div>
            <div className="mt-20">
              <Checkbox.Group
                style={{ width: '100%' }}
                value={filters.size}
                onChange={onFilterSize}
              >
                <Row gutter={[0, 10]}>
                  {(sizes || []).map((item) => {
                    return (
                      <Col span={12} key={item.id}>
                        <Checkbox value={item.name}>{item.name}</Checkbox>
                      </Col>
                    )
                  })}
                </Row>
              </Checkbox.Group>
            </div>
          </Col>
          <Col xs={24} sm={18}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {t.PRODUCTS.searchByName}
                <Input onChange={handleChange} />
              </div>
              <div style={{ display: 'grid' }}>
                {t.PRODUCTS.sortBy}
                <Select
                  className="custom-select-sort"
                  style={{ width: 180 }}
                  value={optionSort}
                  onChange={(value) => handleSortByPrice(value)}
                >
                  <Option value={0}>{t.PRODUCTS.default}</Option>
                  <Option value={1}>{t.PRODUCTS.lowToHigh}</Option>
                  <Option value={2}>{t.PRODUCTS.hightToLow}</Option>
                </Select>
              </div>
            </div>

            <div className="border-bottom-width" />
            <List
              grid={{
                gutter: [25, 30],
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 3
              }}
              dataSource={productsSort}
              loading={isFetching}
              pagination={{
                defaultPageSize: 15,
                current: currentPage,
                onChange: onChangePage
              }}
              renderItem={(item) => (
                <List.Item>
                  <Category data={item} />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Products
