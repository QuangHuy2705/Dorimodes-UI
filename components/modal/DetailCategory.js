import { Button, Modal, Col, Row, InputNumber } from 'antd';
import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons'

const DetailCategory = ({ title = '', data = null, isVisible = false, onClose = null, locale = 'pl' }) => {

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
                        {data.price} $
                    </div>
                    <div className='border-bottom-width' />
                    <div className='g-color-black'>
                        {data.description[locale]}
                    </div>
                    <div className='border-bottom-width' />
                    {
                        data.color && data.color.length > 0 &&
                        <>
                            Màu&nbsp;&nbsp;&nbsp;{data.color.map((color, idx) => {
                                return <Button
                                    className='btn-select-option'
                                    icon={<CheckOutlined style={{ color: 'rgb(7, 164, 54)' }} />}
                                    key={idx}
                                >
                                    {color}
                                </Button>
                            })}
                            <div className='border-bottom-width' />
                        </>
                    }
                    {
                        data.size && data.size.length > 0 &&
                        <>
                            Size&nbsp;&nbsp;&nbsp;{data.size.map((size, idx) => {
                                return <Button
                                    className='btn-select-option'
                                    key={idx}
                                    icon={<CheckOutlined style={{ color: 'rgb(7, 164, 54)' }} />}
                                >
                                    {size}
                                </Button>
                            })}
                            <div className='border-bottom-width' />
                        </>
                    }
                    <div>
                        Số lượng: <InputNumber
                            min={1}
                            max={10}
                            style={{ width: 50 }}
                            defaultValue={1}
                        />&nbsp;&nbsp;&nbsp;&nbsp;<button className='btn-order-category' >Thêm vào giỏ hàng</button>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default DetailCategory;