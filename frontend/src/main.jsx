import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {AuthProvider} from "./AuthProvider.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={5000}/>
    </StrictMode>,
)
