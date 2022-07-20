import React, { useEffect } from 'react'
import Category from '../category'
import { Row, List, Divider, Empty } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getLanguage } from '../../utils/laguage'

function HomeComponent() {
    const t = getLanguage()
    const {
        products,
        isFetching
    } = useSelector(state => state.product)

    return (
        <div className='bikini-home'>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='background-header mt-0' />
            </Row>
            <div style={{ fontWeight: 600 }} className='flex-align-center'>
                HOT DEAL
            </div>
            <Divider plain>{t.HOME.outstanding}</Divider>
            <Row className='flex-align-center'>
                <div className='container'>
                    <List
                        grid={{
                            gutter: [25, 30],
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 4
                        }}
                        dataSource={products}
                        loading={isFetching}
                        pagination={{
                            defaultPageSize: 16
                        }}
                        renderItem={item => (
                            <List.Item>
                                <Category data={item} />
                            </List.Item>
                        )}
                    />
                    <div className='text-align-center '> {(!products || products.length === 0) && < Empty />}</div>
                </div>
            </Row>
        </div>
    )
}

export default HomeComponent