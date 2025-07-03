import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, TrendingUp, Plus, BarChart3 } from 'lucide-react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import FeedbackCard from '../components/FeedbackCard';
import FeedbackForm from '../components/FeedbackForm';
import { User, Feedback, FeedbackStats } from '../types';
import { users, feedback } from '../utils/api';

const ManagerDashboard: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<FeedbackStats>({ total: 0, positive: 0, neutral: 0, negative: 0 });
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [teamData, feedbackData, statsData] = await Promise.all([
        users.getTeamMembers(),
        feedback.getAll(),
        feedback.getStats(),
      ]);
      setTeamMembers(teamData);
      setFeedbackList(feedbackData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFeedback = async (feedbackData: any) => {
    try {
      await feedback.create(feedbackData);
      loadData();
    } catch (error) {
      console.error('Failed to create feedback:', error);
    }
  };

  const openFeedbackForm = (employee: User) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const getEmployeeStats = (employeeId: string) => {
    const employeeFeedback = feedbackList.filter(f => f.employee_id === employeeId);
    return {
      total: employeeFeedback.length,
      positive: employeeFeedback.filter(f => f.sentiment === 'positive').length,
      neutral: employeeFeedback.filter(f => f.sentiment === 'neutral').length,
      negative: employeeFeedback.filter(f => f.sentiment === 'negative').length,
    };
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
          <p className="text-gray-600">Manage your team's feedback and performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Team Members"
            value={teamMembers.length}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Total Feedback"
            value={stats.total}
            icon={MessageSquare}
            color="green"
          />
          <StatCard
            title="Positive Feedback"
            value={`${stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0}%`}
            icon={TrendingUp}
            color="green"
          />
          <StatCard
            title="Needs Improvement"
            value={`${stats.total > 0 ? Math.round((stats.negative / stats.total) * 100) : 0}%`}
            icon={BarChart3}
            color="red"
          />
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => {
                const memberStats = getEmployeeStats(member.id);
                return (
                  <div key={member.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                      <button
                        onClick={() => openFeedbackForm(member)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Feedback:</span>
                        <span className="font-medium">{memberStats.total}</span>
                      </div>
                      {memberStats.total > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sentiment:</span>
                          <div className="flex space-x-2">
                            <span className="text-green-600">😊 {memberStats.positive}</span>
                            <span className="text-yellow-600">😐 {memberStats.neutral}</span>
                            <span className="text-red-600">😔 {memberStats.negative}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Feedback</h2>
          </div>
          <div className="p-6">
            {feedbackList.length > 0 ? (
              <div className="space-y-6">
                {feedbackList.slice(0, 5).map((feedbackItem) => (
                  <FeedbackCard key={feedbackItem.id} feedback={feedbackItem} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
                <p className="text-gray-500">Start by giving feedback to your team members</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Feedback Form Modal */}
      {selectedEmployee && (
        <FeedbackForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateFeedback}
          employeeId={selectedEmployee.id}
          employeeName={selectedEmployee.name}
        />
      )}
    </div>
  );
};

export default ManagerDashboard;