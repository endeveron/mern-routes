import { useEffect, useState } from 'react';

export const useTravelList = () => {
  const [travelList, setTravelList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelList = async () => {
      try {
        const res = await fetch(`${ process.env.REACT_APP_BACKEND_URL }/api/travel`);
        const resData = await res.json();
        setIsLoading(false);
        setTravelList(resData.travelList);

      } catch (err) {
        setIsLoading(false);
        console.log(err);
        setError({
          dialogContent: {
            title: 'Немає зв\'язку з сервером',
            message: 'Вибачте за тимчасові незручності. Будь ласка, спробуйте пізніше.'
          }
        });
      }
    }
    fetchTravelList();
  }, []);

  const updTravelList = (travelList) => {
    setTravelList(travelList);
  }

  return { travelList, updTravelList, isLoading, travelListError: error }
}