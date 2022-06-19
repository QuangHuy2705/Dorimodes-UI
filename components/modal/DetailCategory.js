import { Button, Modal, Col, Row, InputNumber } from 'antd';
import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons'

const DetailCategory = ({ title = '', data = null, isVisible = false, onClose = null }) => {

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
                    <img alt="" src={data.img} width='100%' />
                    {
                        <Row className='mt-20'>
                            {(data.arrImages || []).map((img, idx) =>
                                <Col span={12} key={idx}>
                                    <img key={idx} src={img} />
                                </Col>
                            )}
                        </Row>

                    }
                </Col>
                <Col span={12} >
                    <b className='fs-20'>{data.name}</b>
                    <div className='mt-5'>
                        Trạng thái: <Button type='primary' size='small' icon={<CheckOutlined />}>Còn hàng</Button>
                    </div>
                    <div className='fs-22 g-color-blue mt-20'>
                        {data.price} $
                    </div>
                    <div className='border-bottom-width' />
                    <div className='g-color-black'>
                        {data.description}
                    </div>
                    <div className='border-bottom-width' />
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