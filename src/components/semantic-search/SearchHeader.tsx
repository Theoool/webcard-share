'use client';

import React from 'react';
import SearchInput from './SearchInput';

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  debouncedSearchTerm: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  debouncedSearchTerm
}) => {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <h1 className="text-2xl font-semibold mb-6 text-center dark:text-gray-100">语义搜索</h1>
      <SearchInput 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        debouncedSearchTerm={debouncedSearchTerm} 
      />
    </div>
  );
};

export default SearchHeader;