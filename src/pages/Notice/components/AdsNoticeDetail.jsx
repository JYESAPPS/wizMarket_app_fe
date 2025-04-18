import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdsNoticeDetail = () => {
    const { state } = useLocation();
    const { notice } = state || {};  // state가 없을 수도 있으므로 fallback 설정
    const navigate = useNavigate();  // navigate 훅 사용

    if (!notice) {
        return <div>공지사항을 찾을 수 없습니다.</div>;
    }

    // 목록 페이지로 돌아가는 함수
    const handleBackToList = () => {
        navigate('/ads/notice');  // 목록 페이지로 이동
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{notice.notice_title}</h2>
            <p className="text-gray-600 mb-4">{notice.notice_content}</p>
            <p className="text-gray-400 text-sm">{notice.created_at}</p>

            {/* 목록으로 돌아가는 버튼 */}
            <button 
                onClick={handleBackToList}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
                목록
            </button>
        </div>
    );
};

export default AdsNoticeDetail;
