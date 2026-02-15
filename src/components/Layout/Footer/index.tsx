import { FaFacebook, FaTelegramPlane } from 'react-icons/fa';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { CiYoutube } from 'react-icons/ci';
import { FaSquareXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

import CategoryList from './components/CategoryList';

const Footer = () => {
  const socials = [
    {
      title: 'Facebook',
      icon: <FaFacebook size={20} />,
    },
    {
      title: 'Twitter-X',
      icon: <FaSquareXTwitter size={20} />,
    },
    {
      title: 'Instagram',
      icon: <BiLogoInstagramAlt size={20} />,
    },
    {
      title: 'Youtube',
      icon: <CiYoutube size={20} />,
    },
    {
      title: 'Telegram',
      icon: <FaTelegramPlane size={20} />,
    },
  ];
  return (
    <footer className="bg-black">
      <div className="container">
        <div className="border-b border-gray-400 py-20">
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-8 text-white">
            <div>
              <h2 className="text-5xl">NEWS</h2>
              <div className="flex gap-4 py-8">
                {socials.map((social, index) => (
                  <div
                    key={`footer-social-${social.title}-${index}`}
                    className="size-9 border-0 border-white flex justify-center items-center rounded-sm text-white hover:text-black hover:bg-white transition-colors duration-400"
                  >
                    {social.icon}
                  </div>
                ))}
              </div>
            </div>
            <CategoryList title="Categories" type="parents" />
            <CategoryList title="Secondaries" type="children" />

            <div>
              <h3 className="text-lg font-bold">Links</h3>

              <div className="flex flex-col gap-1 mt-4">
                <Link href={''} className="text-gray-300">
                  About
                </Link>
                <Link href={''} className="text-gray-300">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-b border-gray-400 py-14">
          <h2 className="text-white text-center text-5xl">NEWS</h2>
        </div>

        <p className="py-8 text-gray-300 text-center bg-black">Copyright © 2025 NEWS</p>
      </div>
    </footer>
  );
};

export default Footer;
