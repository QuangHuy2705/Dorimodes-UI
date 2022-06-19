import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, Button, Tooltip } from 'antd'
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons'
import DetailCategory from '../modal/DetailCategory'

const { Meta } = Card;

const dumpData = {
    _id: '1',
    name: 'Bikini sọc đen',
    price: 720,
    description: 'Đồ bơi 2 mảnh lập thể cung cấp bởi Cotton On Body Với Kiểu dáng mới lạ, hợp thời trang, đem đến sự thoải mái và tự tin cho phái đẹp khi đi chơi biển. - Áo chui cố định, không khóa lưng - Quần rút dây, phối màu xanh Hướng dẫn sử dụng: - Giặt bằng tay - Phơi nơi có bóng râm, mát',
    img: 'https://product.hstatic.net/1000329192/product/upload_68d6b7ef5f954ebbb910addf29b706f0_grande.jpg',
    arrImages: [
        'https://product.hstatic.net/1000329192/product/upload_fbce7f33f565421ca5a5f29e0a2d6448_compact.jpg',
        'https://product.hstatic.net/1000329192/product/upload_402c14e337934ed08b021d037200ac03_compact.jpg'
    ]
}

function Category(props) {
    const [isVisible, setVisible] = useState(false)
    const openDetailCategory = (item) => {
        setVisible(true)
    }

    const closeModalDetail = () => {
        setVisible(false)
    }

    return (
        <>
            <div className='category-item'>
                <DetailCategory
                    isVisible={isVisible}
                    onClose={closeModalDetail}
                    data={dumpData}
                />
                <div>
                    <img
                        src="https://product.hstatic.net/1000329192/product/upload_68d6b7ef5f954ebbb910addf29b706f0_grande.jpg"
                        alt="Picture of the author"
                        width={'100%'}
                        height={'100%'}
                    />
                </div>

                <div className="category-action-hover">
                    <div className='action-hover'>
                        <Tooltip title="Thêm vào giỏ hàng">
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
                    Bikini sọc đen
                </div>
                <div className='g-color-blue'>
                    170$
                </div>
            </div>
        </>
    )
}

export default Category