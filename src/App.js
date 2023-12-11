import "./App.css";
import StatsGrid from "./grid/StatsGrid";
import { WebSocketProvider } from "./WebSocketContext";

function App({ backendHost }) {
  console.log("backendHost", backendHost);
  return (
    <WebSocketProvider backendHost={backendHost}>
      <div className="App">
        <header className="App-header"></header>
        <StatsGrid backendHost={backendHost} />
      </div>
    </WebSocketProvider>
  );
}

export default App;
