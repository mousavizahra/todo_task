 import { createRoot } from 'react-dom/client'
import App from './components/App'
import { Provider } from 'react-redux';
import store from './redux/store/index';
 
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
