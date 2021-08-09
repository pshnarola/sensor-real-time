import { render, screen } from "@testing-library/react";
import App from "./App";

test("Render waiting text", () => {
  render(<App />);
  const waitingText = screen.getByText(
    /Waiting for each sensor to send data.../i
  );
  expect(waitingText).toBeInTheDocument();
});

it("Display latest sensor value", () => {
  render(<App />);
  const sensorNode = screen.getByTestId("sensor-value");
  expect(sensorNode).toBeInTheDocument();
});
