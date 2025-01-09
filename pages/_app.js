import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/Home.module.css';
import "quill/dist/quill.snow.css";
import { Provider } from 'react-redux';
import store from './views/redux/store'
import { LoadingProvider } from "./views/loadingPages/loadingContext"
import LoadingScreen from "./views/loadingPages/loadingScreen"
import FetchDataPage from "./views/redux/fetchDataPage"


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <FetchDataPage>
        <LoadingProvider>
          <LoadingScreen />
          <Component {...pageProps} />
        </LoadingProvider>
      </FetchDataPage>
    </Provider>
  )
}

