import './App.css';
import Header from './Components/Header';
import { Routes, Route, } from "react-router-dom";
import Footer from './Components/Footer';
import { Suspense, lazy } from 'react';
import Loading from './Components/Loading/Loading';
import PWA from './Components/PWA/PWA';
import Scroll from './Components/PWA/Scroll';
const Home = lazy(() => import('./Pages/Home'))
const All = lazy(() => import('./Pages/All'))
const About = lazy(() => import('./Pages/About'))
const Kepillik = lazy(() => import('./Pages/Kepillik'))
const TehnikiHyzmat = lazy(() => import('./Pages/TehnikiHyzmat'))
const EltweTole = lazy(() => import('./Pages/EltweTole'))
const Teswirler = lazy(() => import('./Pages/Teswirler'))
const Corzina = lazy(() => import('./Pages/Corzina'))
const Order = lazy(() => import('./Pages/Order'))
const Compare = lazy(() => import('./Pages/Compare'))
const GizlinlikSyyasaty = lazy(() => import('./Pages/GizlinlikSyyasaty'))
const Category = lazy(() => import('./Pages/Category'))
const Product = lazy(() => import('./Pages/Product'))
const Search = lazy(() => import('./Pages/Search'))
const Favorites = lazy(() => import('./Pages/Profile-Pages/Favorites'))
const OrdersHistory = lazy(() => import('./Pages/Profile-Pages/OrdersHistory'))
const MyReviews = lazy(() => import('./Pages/Profile-Pages/MyReviews'))
const MyAddress = lazy(() => import('./Pages/Profile-Pages/my-address/MyAddress'))
const ProfileEdit = lazy(() => import('./Pages/Profile-Pages/ProfileEdit'))
const Brands = lazy(() => import('./Pages/Brands'))
const Recommend = lazy(() => import('./Pages/Recommend'))
const New = lazy(() => import('./Pages/New'))
const Nav = lazy(() => import('./Components/Nav'))
function App() {
  return (
    <div className='flex flex-col'>
      <Scroll />
      <PWA />
      <Header />
      <div className='flex md:flex-row flex-col md:mx-5 mx-0'>
        <Suspense fallback={<Loading />}>
          <Nav />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/all' element={<All />} />
            <Route path='/about' element={<About />} />
            <Route path='/guarantee' element={<Kepillik />} />
            <Route path="/service" element={<TehnikiHyzmat />} />
            <Route path="/delivery-and-payment" element={<EltweTole />} />
            <Route path="/ratings" element={<Teswirler />} />
            <Route path='/card' element={<Corzina />} />
            <Route path='/order' element={<Order />} />
            <Route path='/compare' element={<Compare />} />
            <Route path='/privacy-policy' element={<GizlinlikSyyasaty />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path='/search' element={<Search />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/orders-history' element={<OrdersHistory />} />
            <Route path='/my-reviews' element={<MyReviews />} />
            <Route path='/my-addresses' element={<MyAddress />} />
            <Route path='/profile-edit' element={<ProfileEdit />} />
            <Route path='/brands' element={<Brands />} />
            <Route path='/recommend' element={<Recommend />} />
            <Route path='/new' element={<New />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
