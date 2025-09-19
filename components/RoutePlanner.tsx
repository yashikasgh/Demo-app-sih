
import React, { useState, useMemo } from 'react';
import { CENTRAL_LINE_STATIONS } from '../constants';
import { SafetyLevel } from '../types';
import { MapPin, ArrowRight } from 'lucide-react';

const safetyStyles = {
  [SafetyLevel.Safe]: {
    dot: 'bg-green-500',
    text: 'text-green-700',
    bg: 'bg-green-100',
  },
  [SafetyLevel.Moderate]: {
    dot: 'bg-yellow-500',
    text: 'text-yellow-700',
    bg: 'bg-yellow-100',
  },
  [SafetyLevel.Unsafe]: {
    dot: 'bg-red-500',
    text: 'text-red-700',
    bg: 'bg-red-100',
  },
};

const RoutePlanner: React.FC = () => {
  const [startStationId, setStartStationId] = useState<number>(CENTRAL_LINE_STATIONS[0].id);
  const [endStationId, setEndStationId] = useState<number>(CENTRAL_LINE_STATIONS[CENTRAL_LINE_STATIONS.length - 1].id);

  const routeStations = useMemo(() => {
    const startIndex = CENTRAL_LINE_STATIONS.findIndex(s => s.id === startStationId);
    const endIndex = CENTRAL_LINE_STATIONS.findIndex(s => s.id === endStationId);
    if (startIndex === -1 || endIndex === -1) return [];
    
    if (startIndex <= endIndex) {
        return CENTRAL_LINE_STATIONS.slice(startIndex, endIndex + 1);
    } else {
        return CENTRAL_LINE_STATIONS.slice(endIndex, startIndex + 1).reverse();
    }
  }, [startStationId, endStationId]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Station Safety Predictor</h2>
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <p className="text-sm text-gray-600">Select your route on the Central Line to see night-time safety predictions.</p>
        <div className="flex items-center space-x-2">
            <select
                value={startStationId}
                onChange={e => setStartStationId(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
                {CENTRAL_LINE_STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <ArrowRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <select
                value={endStationId}
                onChange={e => setEndStationId(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
                {CENTRAL_LINE_STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Your Route</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
            <ul className="space-y-3">
            {routeStations.map((station, index) => (
                <li key={station.id} className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-4 ${safetyStyles[station.safety].dot}`}></div>
                    <span className="font-medium text-gray-800">{station.name}</span>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${safetyStyles[station.safety].bg} ${safetyStyles[station.safety].text}`}>
                    {station.safety}
                </span>
                </li>
            ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default RoutePlanner;
