
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

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/predictions`, {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 shadow-2xl">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="text-4xl">⚽</div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Football Predictions
            </h1>
            <div className="text-4xl">🏆</div>
          </div>
          <p className="text-center text-green-100 mt-2 text-lg">
            Match Predictions & Analytics
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">📊</div>
              <div>
                <h3 className="text-xl font-bold">Total Matches</h3>
                <p className="text-2xl font-bold">{filteredPredictions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="text-xl font-bold">High Confidence</h3>
                <p className="text-2xl font-bold">
                  {filteredPredictions.filter((p: any) => parseFloat(p.probability.home_win) > 70).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">📈</div>
              <div>
                <h3 className="text-xl font-bold">Avg Probability</h3>
                <p className="text-2xl font-bold">
                  {filteredPredictions.length > 0 
                    ? Math.round(filteredPredictions.reduce((sum: number, p: any) => sum + parseFloat(p.probability.home_win), 0) / filteredPredictions.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <DatePicker value={date} onChange={setDate} />
            </div>
            <div className="flex-1">
              <SearchBox value={search} onChange={setSearch} />
            </div>
            <button
              onClick={fetchPredictions}
              disabled={loading}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>🔄</span>
                  <span>Refresh</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <span>📋</span>
              <span>Match Predictions</span>
            </h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                <p className="text-white text-lg">Loading predictions...</p>
              </div>
            ) : (
              <PredictionsTable predictions={filteredPredictions} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/70">
          <p>© 2025 Football Predictions</p>
        </div>
      </div>
    </div>
  );
}
