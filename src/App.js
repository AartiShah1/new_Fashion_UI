import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/home";
import Signup from "./component/signup";
import Login from "./component/login";
import Blogs from "./component/Blogs";
import Navbar from "./component/navbar";
import About from "./component/About";
import Contact from "./component/contact";
import AddProduct from "./component/addProduct";
import ProductList from "./page/product_list";
import Inventory_list from "./component/inventory";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductContextProvider } from "./component/global/productContext";
import { CartContextProvider } from "./component/global/cartContext";
import Cart from "./component/cart";
import Cashout from "./component/cashOut";
import User_cartdetail from "./page/user_cartdetail";
import UserDetail_Handler from "./component/userDetail_Handler"
import Sidebar from "./component/Sidebar";
import Dashboard from "./page/dashboard";
const App = () => {
  return (
    <>
      <ProductContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<Signup />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route exact path="/cartproducts" Component={Cart} />
              {/* eslint-disable-next-line */}
              <Route path="/inventory" element={<Inventory_list />} />
              <Route path="/user_cartdetail" element={<User_cartdetail />} />

              <Route path="/product_list" element={<ProductList />} />
              <Route exact path="/cashOut" Component={Cashout} />
              <Route path="/userDetail_Handler" element={<UserDetail_Handler/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/sidebar" element={<Sidebar/>} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ProductContextProvider>
    </>
  );
};

export default App;
