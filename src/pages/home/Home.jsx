import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonial from '../../components/testimonial/Testimonial'
import Track from '../../components/track/Track'
import Footer from '../../components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  console.log(cartItem);

  const addCart = ()=>{
    dispatch(addToCart("Shirt"));
  }

  const deleteCart = ()=>{
    dispatch(deleteFromCart("shirt"));
  }

  return (
    <Layout >
      
      <HeroSection />

      <Filter />

      <ProductCard />
      <div className='flex justify-center -mt-10 mb-4' >
        <Link to={'/allproducts'} >
        <button className='bg-gray-300 px-5 py-2 rounded-xl' >See More</button>
        </Link>
      </div>

      <Track />

      <Testimonial />

      {/* <Footer /> */}
    </Layout>
  )
}

export default Home
