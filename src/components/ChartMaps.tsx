import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

Chart.register(...registerables);

interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

interface CountryData {
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

function ChartMaps() {
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch date-wise historical data
      const historicalDataResponse = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      const historicalData: HistoricalData = await historicalDataResponse.json();
      
      // Fetch country-wise covid-19 data
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const data: CountryData[] = await response.json();

      setCountryData(data);
      setHistoricalData(historicalData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex">
        {/* Line Graph */}
        <div className="w-1/2 p-4">
          <Line
            data={{
              labels: Object.keys(historicalData?.cases || {}),
              datasets: [
                {
                  label: 'Cases',
                  data: Object.values(historicalData?.cases || {}),
                  fill: false,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Deaths',
                  data: Object.values(historicalData?.deaths || {}),
                  fill: false,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Recovered',
                  data: Object.values(historicalData?.recovered || {}),
                  fill: false,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
        
        {/* Map */}
        <div className="w-1/2 p-4">
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px' }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {countryData.map((country) => (
              <Marker key={country.country} position={[country.countryInfo.lat, country.countryInfo.long]}>
                <Popup>
                  <div>
                    <h3>{country.country}</h3>
                    <p>Total Cases: {country.cases}</p>
                    <p>Total Deaths: {country.deaths}</p>
                    <p>Total Recovered: {country.recovered}</p>
                    <p>Total Active: {country.cases - country.deaths - country.recovered}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      )}
    </div>
  );
}

export default ChartMaps;
