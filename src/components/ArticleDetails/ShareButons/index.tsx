'use client';
import { FaFacebook, FaRedditSquare } from 'react-icons/fa';
import {
  FacebookShareButton,
  RedditShareButton,
  ThreadsShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { FaSquareXTwitter, FaSquareThreads } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';

const ShareButtons = () => {
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div>
      <h3 className="pt-10 pb-5">Share</h3>
      <div className={`grid grid-cols-5 text-neutral-500`}>
        <div className="border border-neutral-800 py-3 hover:text-white transition">
          <FacebookShareButton url={url} className="w-full flex justify-center items-center">
            <FaFacebook size={20} />
          </FacebookShareButton>
        </div>
        <div className="border border-neutral-800 py-3 hover:text-white transition">
          <TwitterShareButton url={url} className="w-full flex justify-center items-center">
            <FaSquareXTwitter size={20} />
          </TwitterShareButton>
        </div>
        <div className="border border-neutral-800 py-3  hover:text-white transition">
          <RedditShareButton url={url} className="w-full flex justify-center items-center">
            <FaRedditSquare size={20} />
          </RedditShareButton>
        </div>
        <div className="border border-neutral-800 py-3  hover:text-white transition">
          <WhatsappShareButton url={url} className="w-full flex justify-center items-center">
            <IoLogoWhatsapp size={20} />
          </WhatsappShareButton>
        </div>
        <div className="border border-neutral-800 py-3  hover:text-white transition">
          <ThreadsShareButton url={url} className="w-full flex justify-center items-center">
            <FaSquareThreads size={20} />
          </ThreadsShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;
