let speech = new SpeechSynthesisUtterance();

const TextToVoice = ({ text }) => {
    speech.text = text;
    window.speechSynthesis.speak(speech);
};

export default TextToVoice;
