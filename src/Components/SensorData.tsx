import { FC, useEffect, useState } from "react";
import { Observable } from "rxjs";

interface ISensorProps {
  title?: string;
  showView?: boolean;
  onSensorDataChange: any;
}

interface ISensorData {
  value?: number | null;
  lastUpdated?: Date | null;
}

const SENSOR_DELAY_INTERVAL = [200, 1500];
const SENSOR_NO_DATA_LIMIT = 1300;

const SensorData: FC<ISensorProps> = ({
  title,
  showView = false,
  onSensorDataChange,
}) => {
  const [sensorData, setSensorData] = useState<ISensorData>({
    value: null,
    lastUpdated: null,
  });

  // Get random sensor value
  function getSensorValue() {
    return ~~(Math.random() * 1000);
  }

  // Put delay for specific time range
  function getDelayInterval() {
    const delay =
      Math.floor(Math.random() * SENSOR_DELAY_INTERVAL[1]) +
      SENSOR_DELAY_INTERVAL[0];
    return delay;
  }

  const getDataOp = new Observable((sub) => {
    let timeout: any = null;

    // recursively send a random number to the subscriber
    // after a delay
    (function push() {
      timeout = setTimeout(() => {
        sub.next(getSensorValue());
        push();
      }, getDelayInterval());
    })();

    // clear any pending timeout on teardown
    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    getDataOp.subscribe((value: any) => {
      // Set sensor value
      setSensorData({
        value,
        lastUpdated: new Date(),
      });

      // Pass latest sensor value to parent
      onSensorDataChange(title, value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show no data if the latest data is older than then no data limit
  const showNoData =
    sensorData &&
    sensorData.lastUpdated !== null &&
    new Date().getTime() - sensorData.lastUpdated?.getTime() >
      SENSOR_NO_DATA_LIMIT;

  if (!showView) return <></>;

  return (
    <div className="column" data-testid={`sensor-${title}`}>
      <div className="card">
        <h3>Sensor - {title}</h3>

        {showNoData ? <p>No data</p> : <p>{sensorData?.value}</p>}
        <p>{sensorData?.lastUpdated?.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default SensorData;
