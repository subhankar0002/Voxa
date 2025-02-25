import axios from "axios";
import React, { useState } from "react";
import VoiceToText from "./Voice-to-Text";
import TextLines from "./skeleton";
import Footer from "./footer";
let speech = new SpeechSynthesisUtterance();
const AiChatbot = () => {
    const [quarry, setQuarry] = useState("");
    const [showAnswer, setShowAnswer] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    async function Getanswer() {
        setShowAnswer(<TextLines />);
        setIsAnswerVisible(true);
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB1xEC0i_liHgFtjdsCtCqICddFxAjRb38",
                method: "post",
                data: {
                    "contents": [{ "parts": [{ "text": quarry }] }]
                }
            });
            setShowAnswer(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            setShowAnswer("Error fetching answer. Try again.");
        }
    }
    const speakText = () => {
        if (!isSpeaking) {
            speech.text = showAnswer;
            window.speechSynthesis.speak(speech);
            setIsSpeaking(true);
            speech.onend = () => {
                setIsSpeaking(false);
            };
        }
    };
    const stopSpeech = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };
    return (
        <div className={`flex flex-col min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <h1 className="text-xl font-bold flex-1 text-center">Voxa</h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="px-4 py-2 bg-gray-600 rounded-full hover:bg-gray-700"
                >
                    {darkMode ? "☀️ " : "🌙 "}
                </button>
            </nav>

            <div className="flex-grow flex flex-col items-center mt-6">
                <div className={`flex justify-between items-center p-2 border rounded-lg w-4/5 sm:w-4/5 md:w-[70%] lg:w-[50%] h-[50px] 
              focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md 
              ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-400 text-black"}`}
                >
                    <textarea
                        value={quarry}
                        onChange={(e) => setQuarry(e.target.value)}
                        placeholder="Search anything..."
                        className="w-full h-[30px] bg-transparent outline-none px-3 text-sm resize-none 
               scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
                    />
                    <VoiceToText setRecognizedText={setQuarry} />
                </div>

                <button
                    onClick={Getanswer}
                    disabled={quarry.trim() === ""}
                    className={`mt-4 px-4 py-2 rounded-md 
                            ${quarry.trim() === ""
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    Generate Answer
                </button>
                {isAnswerVisible && (
                    <div className={`relative mt-4 w-4/5 border rounded-md shadow-lg p-4 
                        ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-100 border-gray-300 text-black"}`}
                    >
                        <button
                            onClick={isSpeaking ? stopSpeech : speakText}
                            className={`absolute bottom-2 bg-opacity-50 right-8 p-2 rounded-md hover:bg-blue-400 ${isSpeaking ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'}`}
                        >
                            {isSpeaking ? "🔊" : "🔇"}
                        </button>
                        <pre className="overflow-auto max-h-[370px] whitespace-pre-wrap scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 px-4">
                            {showAnswer || "No text available"}
                        </pre>
                    </div>
                )}
            </div>
            <Footer darkMode={darkMode} className="mt-auto" />
        </div>
    );
};

export default AiChatbot;
