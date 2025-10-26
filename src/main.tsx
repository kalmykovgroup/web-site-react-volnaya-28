
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {apiClient} from "@/baseApi/apiClient.ts";
import {setupInterceptors} from "@/baseApi/interceptors.ts";
import {store} from "@/store.ts";

// Передаём store в interceptors и настраиваем
setupInterceptors(apiClient);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)