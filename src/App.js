import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

function App() {
  const [stations, setStations] = useState([]);
  const [activeStation, setActiveStation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://data.foli.fi/citybike");
      setStations(result.data.racks);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Map center={[60.445, 22.264824]} zoom={13}>
          {activeStation && (
            <Popup
              position={[activeStation.lat, activeStation.lon]}
              onClose={() => {
                setActiveStation(null);
              }}
            >
              <div>
                <h3>{activeStation.name}</h3>
                <p>Pyöriä asemalla: {activeStation.bikes_avail}</p>
              </div>
            </Popup>
          )}

          {Object.values(stations).map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lon]}
              onclick={() => setActiveStation(station)}
            />
          ))}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    </div>
  );
}

export default App;
