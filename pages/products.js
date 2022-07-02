import React, { useEffect } from 'react'
import HeaderComponent from '../components/header'
import { Row, Col, Timeline, Form, Input, Button } from 'antd'
import Products from '../components/products'
import func from '../utils/func'

const { TextArea } = Input;

function Product() {
    return (
        <div className='flex-align-center' style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div className='main-header'>
                <HeaderComponent />
            </div>
            <Row style={{ width: '100%' }}>
                <Products />
            </Row >
        </div >

    )
}

export default Product;