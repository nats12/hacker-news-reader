import React, { useState, useEffect, ReactElement } from "react";
import { Button } from "./components/buttons/Button";
import Header from "./components/Header";
import ToastNotification from "./components/notifications/ToastNotification";
import StoriesList from "./components/StoriesList";
import * as serviceWorker from "./serviceWorkerRegistration";

/**
 * App
 *
 * The web app's parent component loading all others.
 * This component is also responsible for checking for new content
 * when the app is being used offline.
 *
 * @returns {ReactElement}
 */
function App(): ReactElement {
  const [newVersionAvailable, setNewVersionAvailable] = React.useState<boolean>(
    false
  );
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );
  const isInProduction = React.useRef<boolean>(false);

  /**
   * onServiceWorkerUpdate
   *
   * This function takes in a ServiceWorkerRegistration and updates its local state
   * to show that a new version of the content is available.
   *
   * @param {ServiceWorkerRegistration} registration The service worker's registration.
   */
  const onServiceWorkerUpdate = (
    registration: ServiceWorkerRegistration
  ): void => {
    setNewVersionAvailable(true);
    setWaitingWorker(registration.waiting);
  };

  /**
   * updateServiceWorker
   *
   * This function posts a message to the waiting service worker to prompt it
   * to skip waiting and reloads the page to show new content.
   *
   */
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
          fadeOut={true}
          remainInView={false}
          fixed={false}
        >
          <p>This app is working offline.</p>
        </ToastNotification>
      )}
      <Header />
      <StoriesList />
      {newVersionAvailable && (
        <ToastNotification
          data-test="component-new-version"
          position={{ bottom: "20px" }}
          fadeOut={false}
          remainInView={true}
          fixed={true}
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
