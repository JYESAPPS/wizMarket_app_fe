import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdsLogin = ({ isOpen, onClose, storeBusinessNumber }) => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 로그인 요청
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/login`,
                {
                    user_id: userId,
                    password: password,
                }
            );

            if (response.data.success) {
                localStorage.setItem("user_id", userId); // ✅ 사용자 ID 저장
                // 로그인 성공 시, 페이지 이동
                if (userId === "admin") {
                    navigate("/ads/notice", { state: { type: "A" } });
                } else if (userId === "jyes") {
                    navigate(`/ads/temp2/${storeBusinessNumber}`, { state: { type: "N" } });
                } else {
                    navigate("/ads/dashboard"); // 다른 사용자 로그인 후 대시보드로
                }
            } else {
                setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            setErrorMessage("서버 오류가 발생했습니다.");
        }
    };

    const handleSignup = () => {
        navigate("/ads/register"); // 이동하고 싶은 경로로 수정 가능
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-center">로그인 페이지 예시</h2>
                <h2 className="text-lg text-center">관리자 아이디 : admin, 비번 : admin</h2>
                <h2 className="text-lg pb-6 text-center">일반 아이디 : jyes, 비번 : 0622</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={handleSignup}
                            className="w-1/2 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                        >
                            가입하기
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            로그인
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdsLogin;
