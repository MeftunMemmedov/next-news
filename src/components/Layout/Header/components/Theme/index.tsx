'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { MdWbSunny } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa6';

const Theme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <MdWbSunny color="white" size={20} /> : <FaMoon color="red" size={20} />}
    </button>
  );
};

export default Theme;
