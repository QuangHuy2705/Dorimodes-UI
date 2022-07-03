import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Tooltip } from 'antd'
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons'
import DetailCategory from '../modal/DetailCategory'
import Cart from '../modal/Cart'
import { useRouter } from "next/router";

function Category(props) {

    const { locale } = useRouter();

    const {
        data
    } = props;

    const [isVisible, setVisible] = useState(false)
    const [isVisibleCart, setVisibleCart] = useState(false)
    const openDetailCategory = () => {
        setVisible(true)
    }

    const closeModalDetail = () => {
        setVisible(false)
    }

    const openCart = () => {
        setVisibleCart(true)
    }


    return (
        <>
            <div className='category-item'>
                <DetailCategory
                    isVisible={isVisible}
                    onClose={closeModalDetail}
                    data={data}
                // locale={locale}
                />
                <div>
                    <img
                        src={data.image[0]}
                        alt="Picture of the author"
                        width={'100%'}
                        style={{ height: 335 }}
                    />
                </div>

                <div className="category-action-hover">
                    <div className='action-hover'>
                        <Tooltip title="Thêm vào giỏ hàng" onClick={openCart}>
                            <Button style={{ backgroundColor: 'transparent' }} icon={<ShoppingCartOutlined style={{ color: '#fff' }} />} size={'large'} />
                        </Tooltip>
                        <Tooltip title="Xem sản phẩm" placement='bottom' onClick={openDetailCategory}>
                            <Button style={{ backgroundColor: 'transparent', top: 10 }} icon={<SearchOutlined style={{ color: '#fff' }} />} size={'large'} />
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className='fw-500 text-align-center mt-10 fs-16 '>
                <div className='g-color-black'>
                    {data.name[locale]}
                </div>
                <div className='g-color-blue'>
                    {data.price} PLZ
                </div>
            </div>
        </>
    )
}

export default Category