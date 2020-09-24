import React, { useState } from 'react'
import 'tachyons'

// fetch the data from api depending on user input
// using fetch then function to assign the variable for the data fetched
// using useState hook to update the user input value 
// displaying fetched data to the web browser 

const api =  {
  key: "8d8e978e647d2b0a8c17c04ba331c0117cd06dc8",
  base: "http://api.waqi.info/search"
}

function App() {
  // to update user input 
  const [city, setCity] = useState('')
  // initial state of data and after fetching the data from api
  const [airqualityData, setAirqualityData] = useState({})

  // user press the enter key and city gets updated based on user input and fetch the data from api
  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}/?keyword=${city}&token=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setAirqualityData(result)
          setCity('')
          // console.log(result);
        });
    }
  }
  return (
    <div>
      <header className="f2 pv3 ph4 bg-light-purple white flex-grow-0 flex-shrink-0">
        <a href="/">Air Quality Index</a>
      </header>
      <div>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search"
              onChange={e => setCity(e.target.value)}
              value={city}
              onKeyPress={search}
            />
          </div>
      </div>
      {/* if there is no fetched data display greeting div else displaying the fetched data */}
      {(typeof airqualityData.data != "undefined") ? (
        <div className="data-display">
          {/* loop through the arrays to display the airquality data */}
          <span>
            {airqualityData.data.map(elem => elem = 
            <ul>
              <span>{elem.station.name}</span>
              <strong><em>{elem.aqi}</em></strong>
            </ul>)}
          </span>
          <a href="https://www.who.int/airpollution/guidelines/en/">
            <em>find out more about air pollution</em>
          </a>
        </div>
        ) : (
          <div className="greeting">
            <h3>Check the air quality of your city!</h3>
            <p>Get prepared for healthier outdoor time</p>
            <img src="airpollution.png" alt="airpollution image"/>
          </div>
        )}
    </div>
  )
}

export default App