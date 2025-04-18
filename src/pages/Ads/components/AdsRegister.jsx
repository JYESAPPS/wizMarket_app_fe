import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AdsRegister = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkMessage, setCheckMessage] = useState("");
    const [isAvailable, setIsAvailable] = useState(null);  // 중복 여부
    const navigate = useNavigate();  // navigate 훅 사용


    // ✅ 아이디 중복 검사
    const checkUserId = async () => {
        if (!userId) {
            setCheckMessage("아이디를 입력하세요.");
            setIsAvailable(false);
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/check/id`,
                { params: { user_id: userId } }
            );

            if (response.data.available) {
                setCheckMessage("사용 가능한 아이디입니다.");
                setIsAvailable(true);
            } else {
                setCheckMessage("이미 사용 중인 아이디입니다.");
                setIsAvailable(false);
            }
        } catch (error) {
            console.error("중복 검사 오류:", error);
            setCheckMessage("오류가 발생했습니다.");
            setIsAvailable(false);
        }
    };

    // ✅ 회원가입 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_FASTAPI_ADS_URL}/ads/register/user`,
                { user_id: userId, password }
            );

            if (response.data.success) {
                alert("회원가입 성공!");
                navigate('/ads/login/MA010120220808570604');
            } else {
                alert("회원가입 실패: " + response.data.message);
            }
        } catch (error) {
            console.error("회원가입 오류:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">회원가입</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e) => {
                                setUserId(e.target.value);
                                setIsAvailable(null);
                                setCheckMessage("");
                            }}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={checkUserId}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            중복확인
                        </button>
                    </div>
                    {checkMessage && (
                        <p className={`text-sm ${isAvailable ? "text-green-600" : "text-red-500"}`}>
                            {checkMessage}
                        </p>
                    )}
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={!isAvailable}
                        className={`w-full py-3 rounded-lg transition 
                        ${isAvailable ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                        가입하기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdsRegister;
