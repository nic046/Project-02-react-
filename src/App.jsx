import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import {
  thunderstormSvg,
  drizzleSvg,
  rainSvg,
  snowSvg,
  atmosphereSvg,
  clearSvg,
  cloudSvg,
  cloudGif,
  drizzleGif,
  rainGif,
  snowGif,
  thunderstormGif,
  atmosphereGif,
  clearGif,
} from "./assets/images";
import Card from "./assets/components/Card.jsx";
import "./App.css";
import Loader from "./assets/components/Loader.jsx";

const key = "d76e689b9c7f89ff257f9a146396cd1f";
const url = "https://api.openweathermap.org/data/2.5/weather";

const initialCoords = {
  latitude: 0,
  longitude: 0,
};

const conditionCodes = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  clear: [800],
  clouds: [801, 802, 803, 804],
};

const icons = {
  thunderstorm: thunderstormSvg,
  drizzle: drizzleSvg,
  rain: rainSvg,
  snow: snowSvg,
  atmosphere: atmosphereSvg,
  clear: clearSvg,
  clouds: cloudSvg,
};

const getLocationByIP = (setCoords) => {
  fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      setCoords({ latitude: data.latitude, longitude: data.longitude });
    })
    .catch((error) => {
      console.error("Error fetching IP location:", error);
    });
};

function App() {
  const [Coords, setCoords] = useState(initialCoords);
  const [Weather, setWeather] = useState({});
  const [toggle, setToggle] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const cityRef = useRef("");

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (error) => {
        getLocationByIP(setCoords);
        console.log("Not accept", error);
      }
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(
        `${url}?lat=${Coords?.latitude}&lon=${Coords?.longitude}&appid=${key}`
      )
      .then((res) => {
        const weatherId = res.data?.weather[0]?.id;
        const iconName = Object.keys(conditionCodes).find((key) =>
          conditionCodes[key].includes(weatherId)
        );
        changeBackGroundImage(iconName);
        setWeather({
          city: res.data?.name,
          country: res.data?.sys?.country,
          icon: icons[iconName],
          main: res.data?.weather[0]?.main,
          wind: res.data?.wind?.speed,
          clouds: res.data?.clouds?.all,
          pressure: res.data?.main?.pressure,
          temperature: toggle
            ? parseInt(res.data?.main?.temp - 273.15)
            : parseInt(32 + ((res.data?.main?.temp - 273) * 9) / 5),
        });
      })
      .catch(() => {
        setError("Location not found");
      })
      .finally(() => {
        setLoading(false);
        console.log("Request complete");
      });
  }, [Coords, toggle]);

  const changeBackGroundImage = (iconName) => {
    const backgroundImages = {
      thunderstorm: thunderstormGif,
      drizzle: drizzleGif,
      rain: rainGif,
      snow: snowGif,
      atmosphere: atmosphereGif,
      clear: clearGif,
      clouds: cloudGif,
    };

    const backgroundImage = backgroundImages[iconName] || snowGif;
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  };

  const updatByCity = (cityName) => {
    setLoading(true);
    setError(null);
    axios
      .get(`${url}?q=${cityName}&appid=${key}`)
      .then((response) => {
        const data = response.data;

        const weatherId = data.weather[0].id;
        const iconName = Object.keys(conditionCodes).find((key) =>
          conditionCodes[key].includes(weatherId)
        );
        changeBackGroundImage(iconName);

        setCoords({
          latitude: data.coord.lat,
          longitude: data.coord.lon,
        });

        setWeather({
          city: data.name,
          country: data.sys.country,
          icon: icons[iconName],
          main: data.weather[0].main,
          wind: data.wind.speed,
          clouds: data.clouds.all,
          pressure: data.main.pressure,
          temperature: toggle
            ? parseInt(data.main.temp - 273.15)
            : parseInt(32 + ((data.main.temp - 273) * 9) / 5),
        });
      })
      .catch(() => {
        setError("City not found");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updatByCity(cityRef.current.value);
  };

  return (
    <>
      {Loading && <Loader />}
      {!Loading && !Error && <h1>{Error}</h1>}
      {!Loading && Weather && (
        <Card
          Weather={Weather}
          toggle={toggle}
          Coords={Coords}
          setToggle={setToggle}
          setCoords={setCoords}
          handleSearch={handleSearch}
          cityRef = {cityRef}
        />
      )}
    </>
  );
}

export default App;
