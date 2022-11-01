import '../app/assets/styles/globals.css'
import Layout from "../app/components/layout/Layout";

function MyApp({Component, pageProps}) {
    return (
        <Layout Component={Component} pageProps={pageProps}>
        </Layout>
    )
}

export default MyApp
