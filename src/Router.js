import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Main from "./pages/Main/Main";
import AdsModalPage from "./pages/Ads/AdsModalPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ads/login/:storeBusinessNumber" element={<AdsModalPage type="login" />} />
        <Route path="/ads/register" element={<AdsModalPage type="register" />} />
        <Route path="/ads/notice" element={<AdsModalPage type="notice" />} />
        <Route path="/ads/notice/:notice_no" element={<AdsModalPage type="detail" />} />
        <Route path="/ads/notice/create" element={<AdsModalPage type="create" />} />
        <Route path="/ads/temp2/:storeBusinessNumber" element={<AdsModalPage type="temp2" />} />
        <Route path="/ads/promote/:uniqueId" element={<AdsModalPage type="promote" />} />
        <Route path="/ads/detail/insta" element={<AdsModalPage type="insta" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
