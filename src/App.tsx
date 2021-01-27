import React, { useState, useEffect, useRef } from "react";
import { Button } from "./components/buttons/Button";
import Header from "./components/Header";
import ToastNotification from "./components/notifications/ToastNotification";
import StoriesList from "./components/StoriesList";
import * as serviceWorker from "./serviceWorkerRegistration";

function App() {
  const [newVersionAvailable, setNewVersionAvailable] = React.useState<boolean>(
    false
  );
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );
  const isInProduction = React.useRef<boolean>(false);

  const onServiceWorkerUpdate = (registration: ServiceWorkerRegistration) => {
    setNewVersionAvailable(true);
    setWaitingWorker(registration.waiting);
  };

  const updateServiceWorker = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setNewVersionAvailable(false);
    window.location.reload();
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      isInProduction.current = true;
      serviceWorker.register({ onUpdate: onServiceWorkerUpdate });
    }
  }, []);

  return (
    <div className="App" data-test="component-app">
      {isInProduction.current && (
        <ToastNotification
          data-test="component-offline-warning"
          className="warning"
          position={{ top: "20px" }}
        >
          <p>This app is using offline-first services.</p>
        </ToastNotification>
      )}
      <Header />
      <StoriesList />
      {newVersionAvailable && (
        <ToastNotification
          data-test="component-new-version"
          position={{ bottom: "20px" }}
        >
          <p>A new version is available!</p>
          <Button className="refresh-button" onClick={updateServiceWorker}>
            REFRESH
          </Button>
        </ToastNotification>
      )}
    </div>
  );
}

export default App;
