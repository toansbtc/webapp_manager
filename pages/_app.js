import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from './api/redux/store'


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
