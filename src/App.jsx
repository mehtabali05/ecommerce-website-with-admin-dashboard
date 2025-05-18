import React from 'react';
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashborad/Dashboard';
import Signup from './pages/registration/Signup';
import Login from './pages/registration/Login'
import NoPage from './pages/noPage/NoPage';
import{
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import MyState from './context/data/myState';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import ProductInfo from './pages/product/productInfo';
import AllProducts from './pages/allProducts/AllProducts';



const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/order' element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path='/cart' element={<Cart />} />
          <Route path='/allproducts' element={<AllProducts />} />
          <Route path='/dashboard' element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/productinfo/:id' element={<ProductInfo />} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/*' element={<NoPage />} />
        </Routes>
        <ToastContainer />
    </Router>
    </MyState>
  )
}

export default App;


// Creating protected Route

export const ProtectedRoute = ({children}) =>{
  const user = JSON.parse(localStorage.getItem('user'));
  if(user){
    if (user.user.email === "aliali@gmail.com") {
      // Block admin from accessing
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }else{
    return <Navigate to="/dashboard" />;
  }
};


export const ProtectedRouteForAdmin = ({children}) =>{
  const admin = JSON.parse(localStorage.getItem('user'));

  if( admin && admin.user.email === "aliali@gmail.com"){
    return children;
  }else{
    return <Navigate to={'/login'} />
  }
};
