import React, { useEffect } from 'react'
import Category from '../category'
import { Row, Col, Divider } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

function HomeComponent() {

    const {
        products
    } = useSelector(state => state.product)

    return (
        <div className='bikini-home'>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='background-header mt-0' />
            </Row>
            <div style={{ fontWeight: 600 }} className='flex-align-center'>
                HOT DEAL
            </div>
            <Divider plain>Sản phẩm nổi bật ngày hôm nay</Divider>
            <Row className='flex-align-center'>
                <div className='container'>
                    <Row gutter={[30, 45]}>
                        {
                            (products || []).map((item, idx) => {
                                return <Col sm={6} xs={24} key={item.id}>
                                    <Category data={idx % 2 === 0 ? item : {
                                        ...item,
                                        image: [
                                            'https://product.hstatic.net/1000329192/product/upload_68d6b7ef5f954ebbb910addf29b706f0_grande.jpg'
                                        ]
                                    }} />
                                </Col>
                            })
                        }
                    </Row>
                </div>
            </Row>
        </div>
    )
}

export default HomeComponent