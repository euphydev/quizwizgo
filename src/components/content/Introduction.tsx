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
    <div className="flex flex-col place-content-center gap-8 p-4 text-center lg:w-7/12 lg:pt-0">
      <Image
        width={72}
        height={72}
        alt="euphydev"
        className="self-center rounded-full"
        src="/euphydev-logo.png"
      />

      <div className="flex flex-col items-center gap-3">
        <h1 className="font-display text-6xl font-extrabold uppercase tracking-tight text-paper sm:text-7xl">
          QuizWizGo
        </h1>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-marquee" />
          ))}
        </div>
        <p className="font-sans text-sm text-slate">
          Quick trivia rounds. Bragging rights included.
        </p>
      </div>

      <form
        className="mx-auto flex w-full max-w-xs flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          handleStartClick();
        }}
      >
        <input
          value={useStore.userName}
          onChange={handleOnChange}
          type="text"
          className="ticket-edge rounded-lg bg-paper p-3 text-center font-sans text-ink shadow-ticket outline-none placeholder:text-slate focus-visible:ring-2 focus-visible:ring-marquee"
          placeholder="Your name"
          aria-label="Your name"
        />
        <button
          type="submit"
          className="rounded-lg bg-marquee p-3 font-sans font-semibold text-ink transition-transform hover:bg-marquee-dark active:translate-y-0.5"
        >
          Go
        </button>
      </form>
    </div>
  );
};

export { Introduction };
