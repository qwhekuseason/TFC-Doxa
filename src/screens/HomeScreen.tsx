import React, { useMemo } from 'react';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useFirestoreQuery } from '../hooks';
import { Sermon } from '../types';
import { BookOpen, Calendar, Users, Zap } from 'lucide-react';
import { SkeletonCard, StatCard } from '../components/UIComponents';

const HomeScreen: React.FC = () => {
  const sermonQ = useMemo(() => query(collection(db, 'sermons'), orderBy('date', 'desc'), limit(3)), []);
  const { data: recentSermons, loading } = useFirestoreQuery<Sermon>(sermonQ);

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse-slow"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">Welcome to Doxa Portal</h1>
          <p className="text-lg opacity-90 max-w-2xl">Your gateway to spiritual growth, community, and divine truth. Join us on this journey of faith.</p>
          <button className="mt-8 px-8 py-3.5 bg-white text-blue-600 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-2xl font-bold font-serif dark:text-white mb-6">Portal Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Members" value="2,450" icon={<Users />} color="bg-blue-500" trend="+18%" />
          <StatCard title="Sermons Available" value={recentSermons.length || '0'} icon={<BookOpen />} color="bg-purple-500" />
          <StatCard title="Upcoming Events" value="12" icon={<Calendar />} color="bg-pink-500" />
          <StatCard title="Daily Engagement" value="89%" icon={<Zap />} color="bg-yellow-500" trend="+5%" />
        </div>
      </div>

      {/* Recent Sermons */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-serif dark:text-white">Latest Sermons</h2>
          <a href="#sermons" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">View All →</a>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <SkeletonCard key={i} height="h-64"/>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSermons.map(sermon => (
              <div key={sermon.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="relative h-40 overflow-hidden">
                  <img src={sermon.coverUrl} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">{sermon.series}</p>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{sermon.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{sermon.preacher}</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold text-sm transition-colors">
                    Listen Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl p-12 text-white text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Ready to Deepen Your Faith?</h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Take a Bible quiz, join the prayer wall, or attend our next event.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-white text-green-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">Start a Quiz</button>
          <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all">Join Prayer Wall</button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;