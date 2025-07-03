import React from 'react';
import { Calendar, CheckCircle, Clock, Tag } from 'lucide-react';
import { Feedback } from '../types';

interface FeedbackCardProps {
  feedback: Feedback;
  onAcknowledge?: (id: string) => void;
  isEmployee?: boolean;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, onAcknowledge, isEmployee = false }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😔';
      default:
        return '😐';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getSentimentIcon(feedback.sentiment)}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isEmployee ? `From ${feedback.manager_name}` : `For ${feedback.employee_name}`}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date(feedback.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentColor(feedback.sentiment)}`}>
            {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
          </span>
          {isEmployee && feedback.acknowledged && (
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Read</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-green-600 mb-2">Strengths</h4>
          <p className="text-gray-700 leading-relaxed">{feedback.strengths}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-amber-600 mb-2">Areas to Improve</h4>
          <p className="text-gray-700 leading-relaxed">{feedback.areas_to_improve}</p>
        </div>

        {feedback.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {feedback.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {isEmployee && !feedback.acknowledged && onAcknowledge && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => onAcknowledge(feedback.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Clock className="w-4 h-4" />
            <span>Mark as Read</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;