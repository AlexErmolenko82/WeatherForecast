import "./App.css";
import WeatherForecast from "./components/WeatherForecast";
// import WeatherAPI from "./components/WeatherAPI.js";

function App() {
  return (
    <div className="container">
      <WeatherForecast />
      {/* <WeatherAPI /> */}
    </div>
  );
}

export default App;
