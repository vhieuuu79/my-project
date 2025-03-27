import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/Store.js'
import toast, { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <>
  <Toaster/>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

  </>
)
