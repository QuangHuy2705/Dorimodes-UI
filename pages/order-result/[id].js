import { Button, Result, Timeline, Row, Col } from 'antd';
import React from 'react';
import { useRouter } from 'next/router'
import { getLanguage } from '../../utils/laguage';

const ResultSucess = () => {
    const router = useRouter()
    const t = getLanguage()
    const { id: orderId } = router.query

    return (
        <>
            <Result
                status="success"
                title="Successfully Order!"
                subTitle={`Order number: ${orderId} \n`}
                extra={[
                    <Button type="primary" key="console" onClick={() => window.location.href = '/'}>
                        Go back to the homepage to continue shopping
                    </Button>
                ]}
            />
            <div className='text-align-center fw-600 fs-16 g-color-blue-black'>{'Order received, please transfer money to account or contact us. Thank you for trusting the product!!!'}</div>
            <div className="flex-align-center mt-20">
                <Timeline>
                    <Timeline.Item color="green">{t.MODAL_INFO.fullname}:&nbsp;&nbsp;<span className="fw-500 g-color-blue-black">{'Dung Nguyen'}</span></Timeline.Item>
                    <Timeline.Item color="green">{t.CART.form.phone}:&nbsp;&nbsp;<span className="fw-500 g-color-blue-black">{'+48 579172183'}</span></Timeline.Item>
                    <Timeline.Item color="green">{t.CART.form.phone}:&nbsp;&nbsp;<span className="fw-500 g-color-blue-black">{'729547602'}</span></Timeline.Item>

                </Timeline>
            </div>
        </>

    )
}

export default ResultSucess;