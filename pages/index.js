import Head from "next/head"
import ProductItem from "../components/ProductItem"
import data from '../utils/data'


const Home = () => {
  

  return (
    
      <div>
        <Head>
        <title>Home Page</title>
    </Head>
        <div className="container grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-10">
          {data.products.map((product) => (
            <ProductItem product={product} key={product.slug}/>
          ))}
        
        </div>
      </div>
      
      
    
  )
}

export default Home

