import React,{useState} from "react";

const VoiceToText = ({ setRecognizedText }) => {

    const [isRecording, setIsRecording] = useState(false);

    const handleClick = () => {
        setIsRecording(true);
        startListening();
        
        // Simulating stop recording after 5 seconds (adjust this based on your logic)
        setTimeout(() => setIsRecording(false), 5000);
    };

    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = navigator.language || "hi-IN";

        recognition.onresult = (event) => {
            let text = event.results[0][0].transcript;
            setRecognizedText(text);
        };
        recognition.start();


    };

    return (
        <div>
    <button 
            onClick={handleClick} 
            className={`pt-1 transition transform focus:outline-none ${isRecording ? "animate-pulse scale-110" : ""}`}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="35px" 
                viewBox="0 0 24 24" 
                fill="none"
            >
                <path 
                    d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" 
                    stroke="#000000" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />
            </svg>
        </button>
</div>

    

    )
};

export default VoiceToText;
