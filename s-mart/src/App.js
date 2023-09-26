import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductInfo from "./components/ProductInfo";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="font-titleFont">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
