import React, { useState, useRef } from "react";
const VoiceToText = ({ setRecognizedText, darkMode }) => {
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null); 
    const toggleRecording = () => {
        if (!isRecording) {
            startListening();
        } else {
            stopListening();
        }
        setIsRecording(!isRecording);
    };
    const startListening = () => {
        if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognitionRef.current = recognition; 
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = navigator.language || "hi-IN";
        recognition.onresult = (event) => {
            let text = event.results[0][0].transcript;
            setRecognizedText(text);
        };
        recognition.onend = () => {
            setIsRecording(false); 
        };

        recognition.start();
    };
    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
        setIsRecording(false);
    };
    return (
        <div>
            <button 
                onClick={toggleRecording} 
                className={`p-2 my-1 h-auto rounded-full transition duration-300 focus:outline-none 
                    ${isRecording ? "animate-pulse scale-110" : ""} 
                    ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-300 text-black hover:bg-gray-400"}`}
            >
                {isRecording ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" fill="none">
                        <path 
                            d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" 
                            stroke="black" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" fill="none">
                        <path 
                            d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" 
                            stroke="black" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default VoiceToText;
