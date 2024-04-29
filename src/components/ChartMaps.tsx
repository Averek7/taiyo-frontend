import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "leaflet/dist/leaflet.css";

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
  const [AllData, setAllData] = useState(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(
    null
  );
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        allDataResponse,
        historicalDataResponse,
        countryDataResponse,
      ] = await Promise.all([
        fetch("https://disease.sh/v3/covid-19/all"),
        fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        ),
        fetch("https://disease.sh/v3/covid-19/countries"),
      ]);

      const allData = await allDataResponse.json();
      const historicalData: HistoricalData = await historicalDataResponse.json();
      const countryData: CountryData[] = await countryDataResponse.json();

      setAllData(allData);
      setCountryData(countryData);
      setHistoricalData(historicalData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setActiveSlide(index),
  };

  const renderChart = () => {
    switch (activeSlide) {
      case 0:
        return (
          <Line
            data={{
              labels: Object.keys(historicalData?.cases || {}),
              datasets: [
                {
                  label: "Cases",
                  data: Object.values(historicalData?.cases || {}),
                  fill: false,
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Deaths",
                  data: Object.values(historicalData?.deaths || {}),
                  fill: false,
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Recovered",
                  data: Object.values(historicalData?.recovered || {}),
                  fill: false,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        );
      case 2:
        return (
          <Bar
            data={{
              labels: Object.keys(AllData || {}),
              datasets: [
                {
                  label: "Per Million People",
                  data: Object.values(AllData || {}),
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#FFD700",
                    "#20B2AA",
                    "#87CEEB",
                    "#FF6347",
                    "#7B68EE",
                    "#32CD32",
                    "#FFA07A",
                    "#00CED1",
                    "#FF4500",
                    "#B0E0E6",
                    "#8A2BE2",
                    "#00FF7F",
                    "#4682B4",
                    "#FF1493",
                    "#00FA9A",
                  ],
                },
              ],
            }}
          />
        );
      case 1:
        return (
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "500px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {countryData.map((country) => (
              <Marker
                key={country.country}
                position={[
                  country.countryInfo.lat,
                  country.countryInfo.long,
                ]}
              >
                <Popup>
                  <div>
                    <h3>{country.country}</h3>
                    <p>Total Cases: {country.cases}</p>
                    <p>Total Deaths: {country.deaths}</p>
                    <p>Total Recovered: {country.recovered}</p>
                    <p>
                      Total Active:{" "}
                      {country.cases - country.deaths - country.recovered}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[90%] mt-10 m-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Slider {...settings}>
          <div>{renderChart()}</div>
          <div>{renderChart()}</div>
          <div>{renderChart()}</div>
        </Slider>
      )}
    </div>
  );
}

export default ChartMaps;
