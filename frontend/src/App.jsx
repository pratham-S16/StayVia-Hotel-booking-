import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import React from "react";
import FeatureDestination from "./components/FeatureDestination";
import Footer from "./components/Footer";
import Allrooms from "./pages/Allrooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import { Toaster} from "react-hot-toast"
import { useAppContext } from "./context/AppContext";

function App() {
  const isOwnerPath = useLocation().pathname.includes("/owner");
  const {showHotelReg}= useAppContext();

  return (
    <>
    <Toaster/>
      {!isOwnerPath && <Navbar/>}
      {showHotelReg && <HotelReg/>}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/rooms" element={<Allrooms/>}/>
          <Route path="/rooms/:id" element={<RoomDetails/>}/>
          <Route path="/my-bookings" element={<MyBookings/>}/>
          <Route path="/owner" element={<Layout/>}>

          </Route>
        </Routes>

      </div>
      <Footer/>
    </>
  );
}

export default App;
