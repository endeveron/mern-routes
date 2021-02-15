import React, { createContext, useContext, useState } from 'react';

const DriverContext = createContext({
  phones: [],
  setPhones: () => { }
});

export const useDriverContext = () => {
  return useContext(DriverContext)
}

export const DriverDataProvider = ({ children }) => {
  const [phones, setPhones] = useState();

  return (
    <DriverContext.Provider value={ {
      phones,
      setPhones
    } }>
      {children }
    </DriverContext.Provider>
  )
}