import React, { useEffect } from 'react'
import Category from '../category'
import { Row, Col, Divider, Empty, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getLanguage } from '../../utils/laguage'

function HomeComponent() {
    const t = getLanguage()
    const {
        products,
        isFetching
    } = useSelector(state => state.product)

    return (
        <div className='bikini-home'>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='background-header mt-0' />
            </Row>
            <div style={{ fontWeight: 600 }} className='flex-align-center'>
                HOT DEAL
            </div>
            <Divider plain>{t.HOME.outstanding}</Divider>
            <Spin spinning={isFetching}>
                <Row className='flex-align-center'>
                    <div className='container'>
                        <Row gutter={[30, 45]}>
                            {
                                (products || []).map((item, idx) => {
                                    return <Col sm={6} xs={24} key={item.id}>
                                        <Category data={item} />
                                    </Col>
                                })
                            }
                        </Row>
                        <div className='text-align-center '> {(!products || products.length === 0) && < Empty />}</div>
                    </div>
                </Row>
            </Spin>

        </div>
    )
}

export default HomeComponent