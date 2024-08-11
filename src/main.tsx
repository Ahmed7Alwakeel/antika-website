import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app/App'
import Auth0ProviderWithNavigate from './utils/Auth0ProviderWithNavigate'
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from './store/store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Auth0ProviderWithNavigate>
            <App />
          </Auth0ProviderWithNavigate>
        </QueryClientProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
)
