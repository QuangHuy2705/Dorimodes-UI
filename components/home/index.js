import React, { useEffect } from 'react'
import HeaderComponent from '../header'
import Image from 'next/image'
import { Row, Col } from 'antd'

function HomeComponent() {
    return (
        <div className='bikini-home'>
            <HeaderComponent />
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col span={18} className='background-header' />
            </Row>
        </div>
    )
}

export default HomeComponent