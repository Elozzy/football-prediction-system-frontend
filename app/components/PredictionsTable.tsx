
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
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-white text-xl mb-2">No matches found</p>
        <p className="text-white/70">Try adjusting your search criteria or date</p>
      </div>
    );
  }

  const getProbabilityColor = (probability: string) => {
    const prob = parseFloat(probability);
    if (prob >= 80) return "text-green-400 bg-green-400/20";
    if (prob >= 70) return "text-blue-400 bg-blue-400/20";
    if (prob >= 60) return "text-yellow-400 bg-yellow-400/20";
    return "text-red-400 bg-red-400/20";
  };

  const getProbabilityIcon = (probability: string) => {
    const prob = parseFloat(probability);
    if (prob >= 80) return "🔥";
    if (prob >= 70) return "⭐";
    if (prob >= 60) return "👍";
    return "⚠️";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="px-6 py-4 text-left text-white font-bold text-lg">Match</th>
            <th className="px-6 py-4 text-center text-white font-bold text-lg">Competition</th>
            <th className="px-6 py-4 text-center text-white font-bold text-lg">Time</th>
            <th className="px-6 py-4 text-center text-white font-bold text-lg">Home Win Probability</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((match, idx) => (
            <tr 
              key={idx} 
              className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200 group"
            >
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">⚽</div>
                  <div>
                    <div className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors">
                      {match.match_details.home_team}
                    </div>
                    <div className="text-white/70 text-sm">vs</div>
                    <div className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors">
                      {match.match_details.away_team}
                    </div>
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4 text-center">
                <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1">
                  <span className="text-lg">🏆</span>
                  <span className="text-white font-medium">
                    {match.match_details.competition_name || "N/A"}
                  </span>
                </div>
              </td>
              
              <td className="px-6 py-4 text-center">
                <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1">
                  <span className="text-lg">🕐</span>
                  <span className="text-white font-medium">
                    {match.match_details.match_time || "TBD"}
                  </span>
                </div>
              </td>
              
              <td className="px-6 py-4 text-center">
                <div className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 font-bold text-lg ${getProbabilityColor(match.probability.home_win)}`}>
                  <span className="text-xl">{getProbabilityIcon(match.probability.home_win)}</span>
                  <span>{match.probability.home_win}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionsTable;
