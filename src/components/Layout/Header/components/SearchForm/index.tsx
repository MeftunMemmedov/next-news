'use client';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

import { getDataList } from '@/api/helpers';
import LoadingSpinner from '@/components/LoadingSpinner';
import SmallArticleCard from '@/components/SmallArticleCard';
import { Article } from '@/types';

const SearchForm = () => {
  const [isSearchFormActive, setIsSearchFormActive] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>('');
  const [status, setStatus] = useState<{ loading: boolean; error: null | Record<string, string> }>({
    loading: false,
    error: null,
  });
  const [results, setResults] = useState<Article[]>([]);

  const getSearchResults = async () => {
    setStatus(prevStatus => ({ ...prevStatus, loading: true }));
    try {
      const res = await getDataList<Article>('news_articles', {
        title: `ilike.%${searchInput}%`,
        limit: 5,
      });
      setResults(res);
    } catch (err) {
      console.log(err);
    } finally {
      setStatus(prevStatus => ({ ...prevStatus, loading: false }));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (searchInput === '' || !isSearchFormActive) {
        setStatus(prevStatus => ({ ...prevStatus, loading: false }));
        setResults([]);
        return;
      } else {
        setStatus(prevStatus => ({ ...prevStatus, loading: true }));
      }
      const timeOut = setTimeout(() => {
        getSearchResults();
      }, 500);

      return () => clearTimeout(timeOut);
    }
  }, [searchInput]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isSearchFormActive) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  }, [isSearchFormActive]);
  return (
    <>
      <button onClick={() => setIsSearchFormActive(prevState => !prevState)}>
        <CiSearch color="white" size={28} />
      </button>
      <div
        className={`w-full h-screen fixed ${isSearchFormActive ? 'top-0 opacity-90' : '-top-full opacity-0'} z-20 transition-all left-0 bg-black flex justify-center items-center`}
      >
        <button
          onClick={() => {
            setIsSearchFormActive(false);
            setTimeout(() => {
              setSearchInput('');
            }, 200);
          }}
          className="text-white absolute top-10 right-10"
        >
          <IoClose size={24} />
        </button>
        <form className="w-full flex justify-center">
          <div className="lg:w-1/2 w-11/12 relative">
            <button className="absolute right-0 bottom-4 rounded-full bg-blue-800 p-3">
              <CiSearch color="white" size={28} />
            </button>
            <input
              type="search"
              placeholder="Search..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="placeholder:text-slate-400 text-white focus:outline-0 placeholder:text-4xl text-4xl py-10 bg-transparent border-b border-blue-600 w-full h-10"
            />
            <div className=" absolute top-24 w-full max-h-96 overflow-auto xl:px-50">
              {status.loading ? (
                <LoadingSpinner />
              ) : results.length > 0 ? (
                results.map((article, index) => (
                  <div className="mb-5" key={`result-${article.id}-${index}`}>
                    <SmallArticleCard article={article} />
                  </div>
                ))
              ) : searchInput !== '' ? (
                <div className="py-3">
                  <p className="text-white text-center text-xl">No Results</p>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
