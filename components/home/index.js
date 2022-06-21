import React, { useEffect } from 'react'
import HeaderComponent from '../header'
import Category from '../category'
import { Row, Col, Divider } from 'antd'

function HomeComponent() {
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
                    <Row gutter={[16, 45]}>
                        <Col span={6}>
                            <Category />
                        </Col>
                        <Col span={6}>
                            <Category />
                        </Col>
                        <Col span={6}>
                            <Category />
                        </Col>
                        <Col span={6}>
                            <Category />
                        </Col>
                        <Col span={6}>
                            <Category />
                        </Col>
                        <Col span={6}>
                            <Category />
                        </Col>
                    </Row>
                </div>
            </Row>
        </div>
    )
}

export default HomeComponent