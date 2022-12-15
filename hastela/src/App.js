
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Container } from 'react-bootstrap';
import Detail from './pages/product-detail/detail';
import Pro from './pages/Product/Product';
import ProductDetail from './pages/product-detail/ProductDetail';
import Login from './pages/Login/Login';
import UserReducer from './reducers/UserReducer';
import { createContext, useReducer } from 'react';
import Register from './pages/Register/Register';

// import Slider from './layouts/Slider/Slider';

export const UserContext = createContext()

function App() {
  const [user, dispatch] = useReducer(UserReducer)
 
  return (

    <BrowserRouter>
      <div className='hd'>
        <img src='https://media.websystem.vn/2169/files/bannerweb.jpg' alt='anh'></img>
      </div>
      <UserContext.Provider value={[user, dispatch]}>
      <Container>
        <Header />

        {/* <Slider /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:cate_id/products/" element={<Detail />} />
          <Route path="/products" element={<Pro />} />
          <Route path="/products/:product_id/" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </Container>
      </UserContext.Provider>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
