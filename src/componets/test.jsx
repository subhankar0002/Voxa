import React, { useState } from "react";

const BengaliTextToSpeech = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("bn-BD"); // Default: Bengali

  const speakText = () => {
    if (!text) {
      alert("দয়া করে কিছু টেক্সট লিখুন।");
      return;
    }

    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = language; // বাংলা ভাষা সেট করা হলো
    speech.rate = 1;
    speech.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((voice) => voice.lang === language);

    if (selectedVoice) {
      speech.voice = selectedVoice;
    } else {
      alert("আপনার ব্রাউজারে বাংলা ভাষার সাপোর্ট নেই!");
    }

    window.speechSynthesis.speak(speech);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🗣️ বাংলা টেক্সট থেকে স্পিচ</h2>

      <textarea
        rows="3"
        cols="40"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="বাংলায় কিছু লিখুন..."
      ></textarea>
      <br />

      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="bn-BD">বাংলা (Bengali)</option>
        <option value="hi-IN">হিন্দি (Hindi)</option>
        <option value="en-US">ইংরেজি (English)</option>
      </select>
      <br />
      
      <button onClick={speakText}>🔊 বলুন</button>
    </div>
  );
};

export default BengaliTextToSpeech;
