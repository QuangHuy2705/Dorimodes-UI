import '../styles/globals.scss'
import '../styles/home.scss'
import '../styles/products.scss'
import 'antd/dist/antd.css'
import store from '../redux/index'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  console.log('deploy')
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
