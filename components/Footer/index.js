import Image from 'next/image'
import styles from '../../styles/Home.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Image
          src="/images/logo1.png"
          alt="Vercel Logo"
          width={150}
          height={100}
        />
      </div>
      {/* <div style={{ flexDirection: 'column', marginLeft: '20px' }}>
                <div className="fs-18 fw-500">
                    <span>Box A17-A19 cemtrum polskie</span> */}
      {/* </div> */}
      {/* <div style={{ marginleft: 30 }}>
                    <div><span className="fw-600">Giờ mở cửa:</span>&nbsp;09:00 AM</div>
                    <div><span className="fw-600">Giờ đóng cửa:</span>&nbsp;10:00 PM</div>
                </div> */}
      {/* </div> */}
    </footer>
  )
}
