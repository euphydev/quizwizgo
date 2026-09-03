import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaDiscord,
  FaGithub,
  FaFacebookSquare,
} from 'react-icons/fa';
import { useMediaQuery } from '../../utils/utils';

const socialLinks = [
  { href: 'https://www.facebook.com/euphydev/', label: 'Facebook', Icon: FaFacebookSquare },
  { href: 'https://www.instagram.com/euphydev/', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://youtube.com/@euphydev', label: 'YouTube', Icon: FaYoutube },
  { href: 'https://twitter.com/euphydev', label: 'Twitter', Icon: FaTwitter },
  { href: 'https://www.tiktok.com/@euphydev', label: 'TikTok', Icon: FaTiktok },
  { href: 'https://discord.gg/pyrW8CXc', label: 'Discord', Icon: FaDiscord },
  { href: 'https://github.com/euphydev', label: 'GitHub', Icon: FaGithub },
];

const Footer = () => {
  const isBreakpoint = useMediaQuery(1024);

  return (
    <div
      className={`fixed bottom-0 w-full py-6 text-paper ${
        isBreakpoint ? '' : 'bg-ink-2'
      }`}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h3 className="font-sans text-sm text-slate">@euphydev</h3>
          <div className="flex space-x-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                target="_blank"
                rel="noreferrer"
                href={href}
                aria-label={label}
                className="text-paper hover:text-marquee"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <p className="font-sans text-xs text-slate">
          &copy; 2023 QuizWizGo. All rights reserved.
        </p>
      </div>
    </div>
  );
};
export default Footer;
