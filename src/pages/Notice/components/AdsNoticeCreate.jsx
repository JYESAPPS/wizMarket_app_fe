import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdsNoticeCreate = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            setError("제목과 내용을 모두 입력해주세요.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/create/notice`, {
                notice_title: title,
                notice_content: content,
            });

            if (response.status === 201) {
                navigate("/ads/notice");
            }
        } catch (error) {
            setError("공지사항을 생성하는데 실패했습니다. 다시 시도해주세요.");
            console.error("공지사항 생성 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoToList = () => navigate("/ads/notice");

    return (
        <div className="max-w-lg mx-auto p-6">
            {/* 제목과 목록 버튼을 나란히 배치 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">공지사항 작성</h2>
                <button
                    onClick={handleGoToList}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                    목록
                </button>
            </div>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="공지사항 제목을 입력하세요"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                        rows="4"
                        placeholder="공지사항 내용을 입력하세요"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "작성 중..." : "작성 완료"}
                </button>
            </form>
        </div>
    );
};

export default AdsNoticeCreate;
