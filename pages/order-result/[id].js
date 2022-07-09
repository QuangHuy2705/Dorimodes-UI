import { Button, Result } from 'antd';
import React from 'react';
import { useRouter } from 'next/router'

const ResultSucess = () => {
    const router = useRouter()
    const { id: orderId } = router.query

    return (
        <Result
            status="success"
            title="Successfully Purchased!"
            subTitle={`Order number: ${orderId}! \n Order is being processed. Thank you for trusting the product!!!`}
            extra={[
                <Button type="primary" key="console" onClick={() => window.location.href = '/'}>
                    Go back to the homepage to continue shopping
                </Button>
            ]}
        />
    )
}

export default ResultSucess;