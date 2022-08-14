import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/header'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import { getLanguage } from '../utils/laguage'
import { Row, Col, Timeline, Badge, Spin } from 'antd'
import api from '../redux/services/api'
export default function About(props) {
  const [background, setBackground] = useState([])

  const [loading, setLoading] = useState(true)

  const getBackground = async () => {
    const data = await api.get('/background')
    if (data.status == 200 && data.data.length > 0) {
      setBackground(data.data.map((i) => i.image))
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBackground()
  }, [])
  const t = getLanguage()
  const slideImages = [
    {
      url: `/images/background/slider_1.png`
    },
    {
      url: '/images/background/product.jpeg'
    },
    {
      url: '/images/background/slide4.jpeg'
    }
  ]
  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '200px 0' }}>
          <Spin size="large" style={{ margin: 'auto' }} />
        </div>
      ) : (
        <div className={styles.container}>
          <div
            className="flex-align-center"
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <div className="main-header">
              <HeaderComponent />
            </div>
            <div style={{ width: '100%' }}>
              <Slide>
                {background.map((slideImage, index) => (
                  <div className="each-slide" key={index}>
                    <div
                      style={
                        index === 0
                          ? {
                              backgroundImage: `url(${slideImage})`,
                              height: '500px',
                              width: '100%',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'contain'
                            }
                          : {
                              backgroundImage: `url(${slideImage})`,
                              height: '500px',
                              width: '100%',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'cover'
                            }
                      }
                    ></div>
                  </div>
                ))}
              </Slide>

              <div
                className={styles[`about-container`]}
                style={{ width: '500px', margin: 'auto' }}
              >
                <div
                  style={{ fontWeight: 600, margin: '40px 0', fontSize: 30 }}
                  className="flex-align-center"
                >
                  {t.HOME.aboutUs}
                </div>
                <Timeline>
                  <Timeline.Item color="green">
                    {t.MODAL_INFO.fullname}:&nbsp;&nbsp;
                    <span className="fw-500 g-color-blue-black">
                      {'Dung Nguyen'}
                    </span>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                    {t.CART.form.phone}:&nbsp;&nbsp;
                    <span className="fw-500 g-color-blue-black">
                      {'+48 579172183'}
                    </span>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                    {t.CART.form.phone}:&nbsp;&nbsp;
                    <span className="fw-500 g-color-blue-black">
                      {'729547602'}
                    </span>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                    {t.CART.form.facebook}:&nbsp;&nbsp;
                    <a
                      href="https://www.facebook.com/DorimodesDQHL"
                      target="_blank"
                    >
                      Dorimodes
                    </a>
                  </Timeline.Item>
                </Timeline>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2453.479613823139!2d20.859879799999995!3d52.0527901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4719318fb6233c25%3A0x74a0d218d424a1af!2sDORIMODES%20-%20BOXA17-A19!5e0!3m2!1sen!2s!4v1660271642952!5m2!1sen!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* <div style={{ width: '100%' }}>
          <Products />
        </div> */}
          </div>

          <Footer />
        </div>
      )}
    </>
  )
}
