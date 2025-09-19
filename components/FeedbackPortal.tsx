
import React, { useState, useCallback } from 'react';
import { ThumbsUp, MessageSquarePlus, Loader2 } from 'lucide-react';
import { INITIAL_FEEDBACK, CENTRAL_LINE_STATIONS } from '../constants';
import type { Feedback } from '../types';
import { filterFeedback } from '../services/geminiService';

const FeedbackCard: React.FC<{ feedback: Feedback; onUpvote: (id: number) => void }> = ({ feedback, onUpvote }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-bold text-gray-800">{feedback.station}</p>
        <p className="text-sm text-gray-600 mt-2">"{feedback.comment}"</p>
        <p className="text-xs text-gray-400 mt-2">- {feedback.userHandle}</p>
      </div>
      <button
        onClick={() => onUpvote(feedback.id)}
        className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors"
      >
        <ThumbsUp className="h-4 w-4" />
        <span className="font-semibold text-sm">{feedback.upvotes}</span>
      </button>
    </div>
  </div>
);

const FeedbackPortal: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(INITIAL_FEEDBACK.sort((a,b) => b.upvotes - a.upvotes));
  const [newComment, setNewComment] = useState('');
  const [selectedStation, setSelectedStation] = useState(CENTRAL_LINE_STATIONS[0].name);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpvote = useCallback((id: number) => {
    setFeedbackList(prevList =>
      prevList.map(f => (f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f)).sort((a,b) => b.upvotes - a.upvotes)
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    setError('');

    const isRelevant = await filterFeedback(newComment);

    if (isRelevant) {
      const newFeedback: Feedback = {
        id: Date.now(),
        station: selectedStation,
        comment: newComment,
        upvotes: 0,
        userHandle: 'You',
      };
      setFeedbackList(prev => [newFeedback, ...prev].sort((a,b) => b.upvotes - a.upvotes));
      setNewComment('');
    } else {
      setError('This comment was flagged as irrelevant and was not posted.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Feedback Portal</h2>
      
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <MessageSquarePlus className="h-5 w-5 mr-2 text-purple-600" />
            Share Your Experience
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            value={selectedStation}
            onChange={e => setSelectedStation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
          >
            {CENTRAL_LINE_STATIONS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Describe any safety concerns or positive experiences..."
            className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
            rows={3}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Feedback'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Community Feedback</h3>
        {feedbackList.map(feedback => (
          <FeedbackCard key={feedback.id} feedback={feedback} onUpvote={handleUpvote} />
        ))}
      </div>
    </div>
  );
};

export default FeedbackPortal;
