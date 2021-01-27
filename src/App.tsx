import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "./components/buttons/Button";
import Header from "./components/Header";
import ToastNotification from "./components/notifications/ToastNotification";
import StoriesList from "./components/StoriesList";
import * as serviceWorker from "./serviceWorkerRegistration";

function App() {
  const [newVersionAvailable, setNewVersionAvailable] = useState<boolean>(
    false
  );
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );

  const onServiceWorkerUpdate = (registration: ServiceWorkerRegistration) => {
    console.log("upadting");
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
      serviceWorker.register({ onUpdate: onServiceWorkerUpdate });
    }
  }, []);

  return (
    <div className="App" data-test="component-app">
      <ToastNotification className="warning" position={{ top: "20px" }}>
        <p>This app is using offline-first services.</p>
      </ToastNotification>
      <Header />
      <StoriesList />
      {newVersionAvailable ? (
        <ToastNotification position={{ bottom: "20px" }}>
          <p>A new version is available!</p>
          <Button onClick={updateServiceWorker}>REFRESH</Button>
        </ToastNotification>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
