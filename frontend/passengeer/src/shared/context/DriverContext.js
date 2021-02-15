import React, { createContext, useContext, useState } from 'react';

const DriverContext = createContext({
  phones: [],
  setPhones: () => { },
  isContactsReady: false,
  setIsContactsReady: () => { }
});

export const useDriverData = () => {
  return useContext(DriverContext)
}

export const DriverDataProvider = ({ children }) => {
  const [phones, setPhones] = useState();
  const [isContactsReady, setIsContactsReady] = useState(false);

  return (
    <DriverContext.Provider value={ {
      phones,
      setPhones,
      isContactsReady,
      setIsContactsReady
    } }>
      {children }
    </DriverContext.Provider>
  )
}