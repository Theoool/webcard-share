'use client';

import React, { useCallback } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  debouncedSearchTerm: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  debouncedSearchTerm
}) => {
  // 清除输入框内容的处理函数
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, [setSearchTerm]);

  return (
    <div className="relative">
      <div 
        style={{'viewTransitionName': 'sarch'}} 
        className="flex items-center border dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200"
      >
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="输入搜索内容..."
          className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ×
          </button>
        )}
      </div>
      {debouncedSearchTerm && debouncedSearchTerm.length < 2 && (
        <p className="text-xs text-gray-500 mt-2 ml-2">请至少输入2个字符</p>
      )}
    </div>
  );
};

export default SearchInput;