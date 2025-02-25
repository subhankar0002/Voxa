import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`w-full py-4 px-6 flex flex-col md:flex-row items-center justify-between 
                  ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
    >
      <p className="w-full text-center text-sm md:flex-1">&copy; {new Date().getFullYear()} Subhankar Saha</p>
      <div className="flex space-x-4 mt-3 md:mt-0 md:ml-auto">
        <a
          href="https://github.com/subhankar0002"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/subhankar-saha-29512b30a/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://subhankar0002.github.io/My-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          <FaGlobe size={24} />
        </a>
        <a
          href="https://x.com/Subhankar_002"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          <FaTwitter size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
