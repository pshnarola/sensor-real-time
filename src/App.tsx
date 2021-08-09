import { useState } from "react";

import "./App.css";
import SensorData from "./Components/SensorData";

interface ISensorFirstLoad {
  [key: string]: boolean;
}

interface ISensorLatestValue {
  sensor?: string | null;
  value?: number | null;
}

const SENSORS = ["A", "B", "C", "D"];

function App() {
  const [sensorFirstLoad, setSensorFirstLoad] = useState<ISensorFirstLoad>(
    () => {
      const initialLoad = {} as ISensorFirstLoad;
      SENSORS.map((sensor) => (initialLoad[sensor] = false));
      return initialLoad;
    }
  );

  const [latestValue, setLatestValue] = useState<ISensorLatestValue>({
    sensor: null,
    value: null,
  });

  const onSensorDataChange = (sensor: string, value: number) => {
    // Set first load on first sensor value received
    if (!sensorFirstLoad[sensor]) {
      setSensorFirstLoad((sensorFirstLoad) => ({
        ...sensorFirstLoad,
        [sensor]: true,
      }));
    }

    // Set latest sensor value
    setLatestValue({ sensor, value });
  };

  // Show sensors only if all sensor values are loaded
  const showView = SENSORS.reduce((showFlag, sensor) => {
    return showFlag && sensorFirstLoad[sensor];
  }, true);

  return (
    <div className="App" data-testid="app">
      {showView && latestValue ? (
        <h2>
          Latest sensor value - {latestValue.sensor} : {latestValue.value}
        </h2>
      ) : (
        <h2 data-testid="sensor-value">
          Waiting for each sensor to send data...
        </h2>
      )}

      <div className="row" data-testid="sensors-list">
        {SENSORS.map((sensor) => (
          <SensorData
            key={`Sensor-${sensor}`}
            title={sensor}
            showView={showView}
            onSensorDataChange={onSensorDataChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
