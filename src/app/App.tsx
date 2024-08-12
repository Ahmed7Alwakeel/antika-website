import Layout from '../components/layout/Layout'
import './../styles/app.scss'
import AppRoutes from './AppRoutes'
import { Helmet } from 'react-helmet';

function App() {
  return (
    <Layout>
      <Helmet>
        <title>Antika Cafe</title>
        <meta name="description" content="Antika is an e-cafe you get your order online" />
        <meta property="og:title" content="Antika Cafe" />
        <meta property="og:description" content="Antika is an e-cafe you get your order online" />
        <meta property="og:image" content="/images/antika-logo.jpeg" />
      </Helmet>
      <AppRoutes />
    </Layout>
  )
}

export default App
