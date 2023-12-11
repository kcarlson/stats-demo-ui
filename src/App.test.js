import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Loading Stats", () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading Stats.../i);
  expect(linkElement).toBeInTheDocument();
});
