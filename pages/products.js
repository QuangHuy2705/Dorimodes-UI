import React, { useEffect } from 'react'
import HeaderComponent from '../components/header'
import { Row, Col, Timeline, Form, Input, Button } from 'antd'
import Products from '../components/products'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

const { TextArea } = Input;

function Product() {
    return (
        <div className={styles.container}>
            <div className='flex-align-center' style={{ flexDirection: 'column', alignItems: 'center' }}>
                <div className='main-header'>
                    <HeaderComponent />
                </div>
                <div style={{ width: '100%' }}>
                    <Products />
                </div >
            </div >

            <Footer />
        </div>


    )
}

export default Product;