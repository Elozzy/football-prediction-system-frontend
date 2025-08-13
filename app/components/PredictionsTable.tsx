import React from "react";

interface Prediction {
  match_details: {
    home_team: string;
    away_team: string;
    competition_name?: string;
    match_time?: string;
  };
  probability: {
    home_win: string;
  };
}

interface Props {
  predictions: Prediction[];
}

const PredictionsTable: React.FC<Props> = ({ predictions }) => {
  if (predictions.length === 0) {
    return <p className="text-center text-gray-500">No matches found with greater than 50% home win chance.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Match</th>
            <th className="px-4 py-2">Competition</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Home Win %</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((match, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{match.match_details.home_team} vs {match.match_details.away_team}</td>
              <td className="px-4 py-2">{match.match_details.competition_name || "N/A"}</td>
              <td className="px-4 py-2">{match.match_details.match_time || "N/A"}</td>
              <td className="px-4 py-2 text-center font-semibold">{match.probability.home_win}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionsTable;
