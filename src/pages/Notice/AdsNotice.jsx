import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";  // 페이지 이동을 위해 useNavigate 사용
import AdsNoticeList from "./components/AdsNoticeList";


const AdsNotice = () => {
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const location = useLocation();
    const { type } = location.state || {};  // 없을 수도 있으니 fallback 필요

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/get/notice`);
                setNotices(response.data);
            } catch (error) {
                console.error("공지사항 불러오기 실패:", error);
            }
        };

        fetchNotices();
    }, []);

    // 글쓰기 페이지로 이동
    const handleCreateNotice = () => {
        navigate('/ads/notice/create'); // '/ads/notice/create' 경로로 이동
    };

    return (
        <div className="mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">공지사항</h2>
            
            {/* 글쓰기 버튼 */}
            {type === "A" && (
                <button 
                    onClick={handleCreateNotice}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    글쓰기
                </button>
            )}

            {/* AdsNoticeList 컴포넌트 사용 */}
            <AdsNoticeList notices={notices} />
        </div>
    );
};

export default AdsNotice;