import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaDiscord,
  FaGithub,
  FaStackOverflow,
  FaCoffee,
  FaFacebookSquare,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '../../utils/utils';

const Footer = () => {
  const isBreakpoint = useMediaQuery(1024);

  if (isBreakpoint) {
    return (
      <div className="text-white fixed bottom-0 w-full py-8 ">
        <div className="container mx-auto px-4  sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:w-full justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-bold text-center">
                follow me: @euphydev
              </h3>
              <div className="flex mt-2 space-x-4">
                <a
                  target="_blank"
                  href="https://www.facebook.com/euphydev/"
                  className="text-white hover:text-button"
                >
                  <FaFacebookSquare className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/euphydev/"
                  className="text-white hover:text-button"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://youtube.com/@euphydev"
                  className="text-white hover:text-button"
                >
                  <FaYoutube className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://twitter.com/euphydev"
                  className="text-white hover:text-button"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@euphydev"
                  className="text-white hover:text-button"
                >
                  <FaTiktok className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://discord.gg/pyrW8CXc"
                  className="text-white hover:text-button"
                >
                  <FaDiscord className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://github.com/euphydev"
                  className="text-white hover:text-button"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              {/* Add additional footer links or information here */}
              <p className="text-sm">
                &copy; 2023 QuizWizGo. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!isBreakpoint) {
    return (
      <div className="bg-main text-white py-8 fixed bottom-0 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-bold text-center">
                follow me: @euphydev
              </h3>
              <div className="flex mt-2 space-x-4">
                <a
                  target="_blank"
                  href="https://www.facebook.com/euphydev/"
                  className="text-white hover:text-button"
                >
                  <FaFacebookSquare className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/euphydev/"
                  className="text-white hover:text-button"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://youtube.com/@euphydev"
                  className="text-white hover:text-button"
                >
                  <FaYoutube className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://twitter.com/euphydev"
                  className="text-white hover:text-button"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@euphydev"
                  className="text-white hover:text-button"
                >
                  <FaTiktok className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://discord.gg/pyrW8CXc"
                  className="text-white hover:text-button"
                >
                  <FaDiscord className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://github.com/euphydev"
                  className="text-white hover:text-button"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              {/* Add additional footer links or information here */}
              <p className="text-sm">
                &copy; 2023 QuizWizGo. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Footer;
