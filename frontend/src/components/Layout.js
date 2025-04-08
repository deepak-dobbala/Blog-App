// components/Layout.js
import Header from './header';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <div style={{ minHeight: "89vh" }}>
        <Outlet /> {/* nested page like Home, Login, etc. will render here */}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
