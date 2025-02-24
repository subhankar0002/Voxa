import axios from "axios";
import React, { useState } from "react";
import TextToVoice from "./Text-to-Voice";
import VoiceToText from "./Voice-to-Text";
import TextToSpeech from "./test"
const AiChatbot = () => {

    const [quarry, setQuarry] = useState("");
    const [showAnswer, setShowAnswer] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);


    async function Getanswer() {
        setShowAnswer("Loading...")
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

    return (
        <div>
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <h1 className="text-xl font-bold flex-1 text-center">Voxa</h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700"
                >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </nav>

            <div className="flex flex-col items-center mt-6">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={quarry}
                        onChange={(e) => setQuarry(e.target.value)}
                        placeholder="Search anything..."
                        className="p-3 border border-gray-400 rounded-lg w-96 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    />

                    <VoiceToText setRecognizedText={setQuarry} />
                </div>
                <button onClick={Getanswer} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
    Generate Answer
</button>

{/* Answer Box with Scroll & Text-to-Voice Button */}
{isAnswerVisible && (
    <div className="relative mt-4 w-4/5 bg-gray-100 border border-gray-300 rounded-md shadow-lg">
        {/* Text-to-Voice Button inside the Answer Box */}
        <button 
            onClick={() => TextToVoice({ text: showAnswer })} 
            className="absolute top-2 right-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
            🔊
        </button>

        {/* Preformatted Answer Content */}
        <pre className="p-4 text-black overflow-auto max-h-[300px] whitespace-pre-wrap">
            {showAnswer || "No text available"}
        </pre>
    </div>
)}
           
                 </div>

        </div>
    );
}
export default AiChatbot


