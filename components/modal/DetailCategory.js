import { Button, Modal, Col, Row, InputNumber } from 'antd';
import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons'

const DetailCategory = ({ title = '', data = null, isVisible = false, onClose = null, locale = 'pl' }) => {
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState(null)
    const [color, setColor] = useState(null)

    const onChange = (value) => {
        setQuantity(value)
    };

    const handleChooseColor = (colorU) => {
        if (colorU === color) {
            setColor(null)
        } else {
            setColor(colorU)
        }
    }

    const handleChooseSize = (sizeU) => {
        if (sizeU === size) {
            setSize(null)
        } else {
            setSize(sizeU)
        }
    }

    return (
        <Modal
            title={title}
            visible={isVisible}
            onOk={() => onClose()}
            onCancel={() => onClose()}
            width={800}
            footer={null}
            className="modal-style-info"
        >
            <Row>
                <Col span={12} style={{ paddingRight: 20 }}>
                    <img alt="" src={data.image[0]} width='100%' />
                    {
                        <Row className='mt-20'>
                            {(data.image || []).map((img, idx) =>
                                <Col span={12} key={idx}>
                                    <img key={idx} src={img} className="icon-category " />
                                </Col>
                            )}
                        </Row>

                    }
                </Col>
                <Col span={12} >
                    <b className='fs-20'>{data.name[locale]}</b>
                    <div className='mt-5'>
                        Trạng thái: <Button type='primary' size='small' icon={<CheckOutlined />}>Còn hàng</Button>
                    </div>
                    <div className='fs-22 g-color-blue mt-20'>
                        {data.price} PLZ
                    </div>
                    <div className='border-bottom-width' />
                    <div className='g-color-black'>
                        {data.description[locale]}
                    </div>
                    <div className='border-bottom-width' />
                    {
                        data.color && data.color.length > 0 &&
                        <>
                            Màu&nbsp;&nbsp;&nbsp;{data.color.map((c, idx) => {
                                return <Button
                                    className='btn-select-option'
                                    icon={(color && color === c) ? <CheckOutlined style={{ color: 'rgb(7, 164, 54)' }} /> : null}
                                    key={idx}
                                    onClick={() => handleChooseColor(c)}
                                >
                                    {c}
                                </Button>
                            })}
                            <div className='border-bottom-width' />
                        </>
                    }
                    {
                        data.size && data.size.length > 0 &&
                        <>
                            Size&nbsp;&nbsp;&nbsp;{data.size.map((s, idx) => {
                                return <Button
                                    className='btn-select-option'
                                    key={idx}
                                    icon={(size && size === s) ? <CheckOutlined style={{ color: 'rgb(7, 164, 54)' }} /> : null}
                                    onClick={() => handleChooseSize(s)}
                                >
                                    {s}
                                </Button>
                            })}
                            <div className='border-bottom-width' />
                        </>
                    }
                    <div>
                        Số lượng: <InputNumber
                            min={1}
                            max={10}
                            value={quantity}
                            style={{ width: 60 }}
                            onChange={onChange}
                            className="custom-input"
                        />&nbsp;&nbsp;&nbsp;&nbsp;<button className='btn-order-category' >Thêm vào giỏ hàng</button>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default DetailCategory;