import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const init: any[] = [];
  const [countries, setCountries] = useState(init);
  const [input, setInput] = useState('');

  const found: any[] = input === '' ? [] : countries.filter((x: any) => x.name.toLowerCase().includes(input.toLowerCase()));

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(x => setCountries(x.data));
  }, []);

  return (
    <div>
      <h1>Country Info</h1>
      <SearchBar input={input} setInput={setInput} />
      {found.length === 1
        ? <Info country={found[0]} />
        : <List names={found.map(x => x.name)} setInput={x => setInput(x)} />}
      {/* <p>{countries.length > 0 ? countries[0] : 'asd'}</p> */}
    </div>
  );
}

function SearchBar({ input, setInput }: { input: string, setInput: (x: string) => void; }) {
  return <div>Find countries <input value={input} onChange={x => setInput(x.target.value)} /></div>;
}

function List({ names, setInput }: { names: string[], setInput: (x: string) => void; }) {
  let display: any = <p style={{ margin: 0 }}>No matches</p>;

  if (names.length > 10) {
    display = <p style={{ margin: 0 }}>Too many matches</p>;
  } else if (names.length > 1) {
    display = names.map(x => <p key={x} style={{ margin: 0 }}>
      {x} <button onClick={() => setInput(x)}>show</button>
    </p>);
  }

  return (
    <div>
      {display}
    </div>
  );
}

function Info({ country }: any) {
  const init: any = {};
  const [weather, setWeather] = useState(init);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`).then(x => {
      setWeather(x.data);
    });
  }, [api_key, country]);

  return (
    <div>
      <h2>{country.name}</h2>
      Capital: {country.capital}<br />
      Population: {country.population}
      <h3>Languages</h3>
      <ul>
        {country.languages.map((x: any) => <li key={x.name}>{x.name}</li>)}
      </ul>
      <p><img src={country.flag} alt='flag' width={100} /></p>
      <Weather location={country.capital} current={weather.current} />
    </div>
  );
}

function Weather({ current, location }: any) {
  if (current == null) {
    return (
      <div>
        <h3>Weather in {location}</h3>
        <p>No data</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Weather in {location}</h3>
      Temperature: {current.temperature} Celcius<br />
      Wind: {current.wind_speed} k/h<br />
      Wind direction: {current.wind_dir}<br />
      {current.weather_icons.map((x: string) => <img key={x} src={x} alt='icon' width={100} />)}
    </div>
  );
}

export default App;
