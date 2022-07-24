import React, { useEffect } from 'react'
import Category from '../category'
import { Row, List, Divider, Empty } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getLanguage } from '../../utils/laguage'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'

function HomeComponent() {
  const t = getLanguage()
  const { products, isFetching } = useSelector((state) => state.product)
  const slideImages = [
    {
      url: '/images/background/slider_1.png'
    },
    {
      url: '/images/background/product.jpeg'
    },
    {
      url: '/images/background/slide4.jpeg'
    }
  ]
  return (
    <div className="bikini-home">
      {/* <Row> */}
      {/* <div className="background-header mt-0" /> */}
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div
              style={{
                backgroundImage: `url(${slideImage.url})`,
                height: '500px',
                width: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'none',
                backgroundSize: 'cover'
              }}
            ></div>
          </div>
        ))}
      </Slide>
      {/* </Row> */}
      <div
        style={{ fontWeight: 600, marginTop: '20px' }}
        className="flex-align-center"
      >
        HOT DEAL
      </div>
      <Divider plain>{t.HOME.outstanding}</Divider>
      <Row className="flex-align-center">
        <div className="container">
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
            renderItem={(item) => (
              <List.Item>
                <Category data={item} />
              </List.Item>
            )}
          />
          <div className="text-align-center ">
            {' '}
            {(!products || products.length === 0) && <Empty />}
          </div>
        </div>
      </Row>
    </div>
  )
}

export default HomeComponent
