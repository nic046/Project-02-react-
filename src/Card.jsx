import Map from "./Map";

function Card({ Weather, toggle, setToggle, setCoords, Coords }) {
  return (
    <div className="card">
      <h1 className="card__title">Weather App</h1>
      <h2 className="card__subtitle">
        {Weather.city}, {Weather.country}
      </h2>
      <div className="card__body">
        <div>
          <img width={200} src={Weather.icon} alt={Weather.main} />
          <div className="card__info">
            <h3 className="card__main">{Weather.main}</h3>
            <p className="card__wind-speed">Wind speed: {Weather.wind}m/s</p>
            <p className="card__clouds">Clouds: {Weather.clouds}%</p>
            <p className="card__pressure">Pressure: {Weather.pressure} hPa</p>
          </div>
        </div>
        <div className="map-container">
          <Map Coords={Coords} setCoords={setCoords} />
        </div>
      </div>
      <h2 className="card__temperature">
        {Weather.temperature} {toggle ? "°C" : "°F"}
      </h2>
      <button
        className="card__button"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Change to {!toggle ? "°C" : "°F"}
      </button>
    </div>
  );
}

export default Card;
