import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Feedback } from '../types';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: Omit<Feedback, 'id' | 'created_at' | 'updated_at' | 'manager_name' | 'employee_name' | 'acknowledged'>) => void;
  employeeId: string;
  employeeName: string;
  existingFeedback?: Feedback;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  employeeId,
  employeeName,
  existingFeedback,
}) => {
  const [strengths, setStrengths] = useState(existingFeedback?.strengths || '');
  const [areasToImprove, setAreasToImprove] = useState(existingFeedback?.areas_to_improve || '');
  const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'negative'>(
    existingFeedback?.sentiment || 'neutral'
  );
  const [tags, setTags] = useState<string[]>(existingFeedback?.tags || []);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      manager_id: '', // Will be set by backend
      employee_id: employeeId,
      strengths,
      areas_to_improve: areasToImprove,
      sentiment,
      tags,
    });
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {existingFeedback ? 'Edit Feedback' : 'New Feedback'} for {employeeName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Strengths
            </label>
            <textarea
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="What are the employee's key strengths and positive contributions?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Areas to Improve
            </label>
            <textarea
              value={areasToImprove}
              onChange={(e) => setAreasToImprove(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="What areas could the employee focus on for growth and improvement?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Sentiment
            </label>
            <select
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value as 'positive' | 'neutral' | 'negative')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="positive">Positive 😊</option>
              <option value="neutral">Neutral 😐</option>
              <option value="negative">Needs Improvement 😔</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a tag (e.g., leadership, communication)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-600 transition-colors duration-200"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {existingFeedback ? 'Update Feedback' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;