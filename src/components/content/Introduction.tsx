import * as React from 'react';
import Image from 'next/image';
import { userStore } from '@store/user';
import Footer from './Footer';

interface IntroductionProps {
  activeModal: (activeModal: string) => void;
}

const Introduction: React.FC<IntroductionProps> = ({ activeModal }) => {
  const useStore = userStore();

  const handleStartClick = () => {
    if (useStore.userName.trim() !== '') {
      activeModal('quiz-settings');
    }
  };

  const handleOnChange = (event: any) => {
    useStore.setUserName(event.target.value);
  };

  return (
    <div className="flex flex-col lg:w-7/12 place-content-center p-4 lg:pt-0">
      <div className="flex flex-col rounded-full">
        <Image
          width={100} // Adjust the width to make it smaller
          height={100} // Ensure width and height are the same for a perfect circle
          alt="EuphyDev"
          className="rounded-full self-center"
          src="/euphydev-logo.png"
        />
      </div>
      <input
        value={useStore.userName}
        onChange={handleOnChange}
        type="text"
        className="bg-transparent outline-none rounded-2xl border-white border border-2xl p-3 px-20 my-10"
        placeholder="Enter name..."
      />
      <button
        onClick={handleStartClick}
        className="rounded-2xl hover:bg-light hover:text-dark p-3 px-20 bg-yellow font-bold"
      >
        Go
      </button>
    </div>
  );
};

export { Introduction };
