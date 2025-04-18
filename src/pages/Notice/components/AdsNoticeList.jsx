import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const AdsNoticeList = ({ notices }) => {
    const navigate = useNavigate();

    // 제목 클릭 시 상세페이지로 이동
    const handleNoticeClick = (notice) => {
        navigate(`/ads/notice/${notice.notice_no}`, {
            state: { notice }  // 공지사항 정보를 state로 전달
        });
    };

    return (
        <div className="border rounded-lg overflow-hidden">
            {notices.length === 0 ? (
                <div className="p-6 text-center text-gray-500">공지사항이 없습니다.</div>
            ) : (
                <table className="w-full table-auto text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">번호</th>
                            <th className="px-4 py-3 text-left">제목</th>
                            <th className="px-4 py-3 text-left">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((notice) => (
                            <tr key={notice.notice_no} className="border-t">
                                <td className="px-4 py-2">{notice.notice_no}</td>
                                <td 
                                    onClick={() => handleNoticeClick(notice)} // 공지사항 전체 객체 전달
                                    className="px-4 py-2 font-medium text-blue-600 cursor-pointer hover:underline"
                                >
                                    {notice.notice_title}
                                </td>
                                <td className="px-4 py-2 text-gray-500">{formatDate(notice.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdsNoticeList;
