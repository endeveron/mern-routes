import React, { useEffect, useState } from "react";

import OfflineNotification from "../components/offline/OfflineNotification/OfflineNotification";

export const useOffline = () => {
  const [isOffline, setIsOffline] = useState(false);

  const connectionChangeHandler = () => {
    navigator.onLine ? setIsOffline(false) : setIsOffline(true);
  }

  useEffect(() => {
    connectionChangeHandler();

    window.addEventListener('online', connectionChangeHandler);
    window.addEventListener('offline', connectionChangeHandler);
    return () => {
      window.removeEventListener('online', connectionChangeHandler);
      window.removeEventListener('offline', connectionChangeHandler);
    }
  }, []);

  const offlineNotification = isOffline ? <OfflineNotification /> : null

  return { isOffline, offlineNotification };
}