import React, { children, createContext, useState } from 'react';

export const SearchContext = createContext()

function SearchComponent({children}) {
    const [searchData,setSearchData]= useState("")
  return (
    <SearchContext.Provider value={{searchData,setSearchData}}>
        {children}
    </SearchContext.Provider>
  )
}

export default SearchComponent