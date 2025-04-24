import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // useNavigate 훅 추가

const AdsAlarm = () => {
    const [open, setOpen] = useState(false);
    const [notices, setNotices] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [unreadNoticeNos, setUnreadNoticeNos] = useState([]);
    const navigate = useNavigate();  // navigate 훅 사용

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                const [noticeRes, readRes] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/get/notice`),
                    axios.get(`${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/get/notice/check/read`, {
                        params: { user_id: userId }
                    })
                ]);

                setNotices(noticeRes.data);
                setUnreadCount(readRes.data.count);
                setUnreadNoticeNos(readRes.data.unread_notices.map(n => n.notice_no));  // 여기가 핵심!
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }
        };

        fetchData();
    }, []);

    // 알림 제목 클릭 시 상세페이지로 이동, notice 데이터를 state로 전달
    const handleNoticeClick = async (notice) => {
        const userId = localStorage.getItem("user_id");
        console.log(userId, notice.notice_no)
        try {
            // 읽음 기록 저장 요청
            await axios.post(`${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/notice/read`, {
                user_id: userId,
                notice_no: notice.notice_no,
            });
        } catch (error) {
            console.error("읽음 처리 실패:", error);
        }
    
        // 공지 상세로 이동
        navigate(`/ads/notice/${notice.notice_no}`, { state: { notice } });
    };
    

    return (
        <div className="relative">
            {/* 알람 버튼 */}
            <button onClick={() => setOpen(!open)}>
                <img
                    src={require("../../../../assets/icon/alarm.png")}
                    alt="알림 아이콘"
                />
                {/* 🔴 빨간불 */}
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                )}
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                )}
            </button>

            {/* 드롭다운 알림창 */}
            {open && (
                <div className="absolute right-0 mt-2 w-52 max-h-40 bg-white border border-gray-200 rounded-lg shadow-lg z-[50] overflow-visible">
                    {/* 꼬리표 */}
                    <div className="absolute top-[-8px] right-2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200 z-[60]" />

                    {/* 공지사항 */}
                    {notices.length > 0 ? (
                        notices.map((notice) => {
                            const isUnread = unreadNoticeNos.includes(notice.notice_no);

                            return (
                                <div
                                    key={notice.notice_no}
                                    className="p-4 border-b border-gray-100 cursor-pointer"
                                    onClick={() => handleNoticeClick(notice)}
                                >
                                    <p className="text-sm font-semibold flex items-center gap-1">
                                        {notice.notice_no}. {notice.notice_title}
                                        {isUnread && (
                                            <span className="ml-1 w-2 h-2 bg-red-500 rounded-full" />
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {notice.notice_content}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            공지사항이 없습니다.
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default AdsAlarm;
