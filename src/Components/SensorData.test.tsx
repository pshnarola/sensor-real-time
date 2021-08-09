import { render, screen } from "@testing-library/react";
import SensorData from "./SensorData";

const defaultProps = {
  title: "A",
  showView: true,
  onSensorDataChange: jest.fn(),
};

test("Sensor should only render when each sensor data is fetched", () => {
  render(<SensorData {...defaultProps} showView={false} />);
  const child = screen.queryByTestId("sensor-A");
  expect(child).not.toBeInTheDocument();
});

test("Show sensor on showView from parent component", () => {
  render(<SensorData {...defaultProps} />);
  expect(screen.getByTestId("sensor-A")).toBeInTheDocument();
});

it("Renders sensor correctly", () => {
  render(<SensorData {...defaultProps} />);

  const sensorNode = screen.getByTestId("sensor-A");
  expect(sensorNode).toHaveTextContent("Sensor - A");
});
