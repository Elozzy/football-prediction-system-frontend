"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import DatePicker from "./components/DatePicker";
import SearchBox from "./components/SearchBox";
import PredictionsTable from "./components/PredictionsTable";

export default function Home() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [search, setSearch] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/predictions`, {
        params: { date },
      });
      setPredictions(res.data);
    } catch (err) {
      console.error(err);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, [date]);

  const filteredPredictions = predictions.filter((match: any) =>
    match.match_details.home_team.toLowerCase().includes(search.toLowerCase()) ||
    match.match_details.away_team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">⚽ Football Predictions</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <DatePicker value={date} onChange={setDate} />
        <SearchBox value={search} onChange={setSearch} />
        <button
          onClick={fetchPredictions}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <PredictionsTable predictions={filteredPredictions} />
      )}
    </div>
  );
}

