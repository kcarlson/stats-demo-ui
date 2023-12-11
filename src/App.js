import "./App.css";
import StatsGrid from "./grid/StatsGrid";
import { WebSocketProvider } from "./WebSocketContext";

function App() {
  return (
    <WebSocketProvider>
      <div className="App">
        <header className="App-header"></header>
        <StatsGrid />
      </div>
    </WebSocketProvider>
  );
}

export default App;
