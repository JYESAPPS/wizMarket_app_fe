import React from "react";
import { useParams } from "react-router-dom";

import AdsPromoteModal from "./components/AdsPromoteModal";
import AdsDetailInsta from "./components/AdsDetailInsta";
import AdsLogin from "./components/AdsLogin";
import AdsRegister from "./components/AdsRegister";
import AdsModalTemVer2 from "./components/AdsModalTemVer2";
import AdsNotice from "../Notice/AdsNotice";
import AdsNoticeCreate from "../Notice/components/AdsNoticeCreate";
import AdsNoticeDetail from "../Notice/components/AdsNoticeDetail";

const AdsModalPage = ({ type }) => {
    const { storeBusinessNumber, ads_id, notice_no } = useParams();


    const handleClose = () => {
        // 새 창을 닫는 동작
        window.close();
    };

    return (
        <>
            {type === "promote" ? (
                <AdsPromoteModal
                    isOpen={true}
                    onClose={handleClose}
                    ads_id={ads_id} // 필요한 경우 전달
                />
            ) : type === "temp2" ? (
                <AdsModalTemVer2
                    isOpen={true}
                    onClose={handleClose}
                    storeBusinessNumber={storeBusinessNumber}
                />
            ) :type === "notice" ? (
                <AdsNotice
                    
                />
            )  :type === "detail" ? (
                <AdsNoticeDetail
                    notice_no = {notice_no}
                />
            ) : type === "create" ? (
                <AdsNoticeCreate
                    
                />
            ) : type === "register" ? (
                <AdsRegister/>
            ) : type === "login" ? (
                <AdsLogin
                    isOpen={true}
                    onClose={handleClose}
                    storeBusinessNumber={storeBusinessNumber}
                />
            ) : type === "insta" ? (
                <AdsDetailInsta
                    isOpen={true}
                    onClose={handleClose}
                    storeBusinessNumber={storeBusinessNumber}
                />
            ) : null}
        </>
    );
};

export default AdsModalPage;
