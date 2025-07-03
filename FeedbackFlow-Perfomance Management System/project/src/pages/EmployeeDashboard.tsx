import React, { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import FeedbackCard from '../components/FeedbackCard';
import { Feedback, FeedbackStats } from '../types';
import { feedback } from '../utils/api';

const EmployeeDashboard: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<FeedbackStats>({ total: 0, positive: 0, neutral: 0, negative: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [feedbackData, statsData] = await Promise.all([
        feedback.getAll(),
        feedback.getStats(),
      ]);
      setFeedbackList(feedbackData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async (feedbackId: string) => {
    try {
      await feedback.acknowledge(feedbackId);
      loadData();
    } catch (error) {
      console.error('Failed to acknowledge feedback:', error);
    }
  };

  const unreadCount = feedbackList.filter(f => !f.acknowledged).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Feedback</h1>
          <p className="text-gray-600">Review feedback from your managers and track your growth</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Feedback"
            value={stats.total}
            icon={MessageSquare}
            color="blue"
          />
          <StatCard
            title="Unread Feedback"
            value={unreadCount}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            title="Acknowledged"
            value={stats.total - unreadCount}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Positive Rate"
            value={`${stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0}%`}
            icon={TrendingUp}
            color="green"
          />
        </div>

        {/* Feedback Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Feedback Timeline</h2>
          </div>
          <div className="p-6">
            {feedbackList.length > 0 ? (
              <div className="space-y-6">
                {feedbackList.map((feedbackItem) => (
                  <FeedbackCard
                    key={feedbackItem.id}
                    feedback={feedbackItem}
                    onAcknowledge={handleAcknowledge}
                    isEmployee={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback received yet</h3>
                <p className="text-gray-500">Feedback from your managers will appear here</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;