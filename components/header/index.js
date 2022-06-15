import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Row, Col } from 'antd'

function HeaderComponent() {
    return (
        <Row className='bikini-header'>
            <Col span={3}>
                <Image alt="" src='/images/logo.png' width={100} height={30} quality={100} />
            </Col>
            <Col span={14}>
                <nav>
                    <ul>
                        <li style={{ display: 'inline-block' }}>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <a>Category 1</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog/hello-world">
                                <a>Category 2</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog/hello-world">
                                <a>Category 3</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Col>


        </Row>
    )
}

export default HeaderComponent