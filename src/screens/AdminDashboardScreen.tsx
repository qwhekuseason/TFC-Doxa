import React, { useEffect, useState, useMemo } from 'react';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useFirestoreQuery } from '../hooks';
import {
  AdminSermonManager,
  AdminUserManager,
  AdminGalleryManager,
  AdminQuizManager,
  AdminTestimonyManager,
  RecentActivityFeed
} from '../components/AdminViews';
import { Users, BookOpen, MessageCircle, Heart, Shield, Brain, ImageIcon, AlertTriangle } from 'lucide-react';
import { StatCard, SkeletonCard, LoadingSpinner } from '../components/UIComponents';

const AdminDashboardScreen: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('overview');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#admin/', '');
      if (['overview', 'sermons', 'users', 'gallery', 'quiz', 'testimonies'].includes(hash)) {
        setActiveSubTab(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (tab: string) => {
    window.location.hash = `#admin/${tab}`;
  };

  const userQ = useMemo(() => query(collection(db, 'users')), []);
  const sermonQ = useMemo(() => query(collection(db, 'sermons')), []);
  const testimonyQ = useMemo(() => query(collection(db, 'testimonies'), where('approved', '==', false)), []);
  const prayerQ = useMemo(() => query(collection(db, 'prayer_requests')), []);

  const { data: users, loading: l1, error: e1 } = useFirestoreQuery(userQ);
  const { data: sermons, loading: l2 } = useFirestoreQuery(sermonQ);
  const { data: testimonies, loading: l3, error: e3 } = useFirestoreQuery(testimonyQ);
  const { data: prayers, loading: l4, error: e4 } = useFirestoreQuery(prayerQ);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-3xl font-serif font-bold dark:text-white tracking-tight">Admin Dashboard</h2>
          <p className="text-gray-500 mt-1">Manage your church's digital presence</p>
        </div>
        <div className="flex gap-2">
          <span className="px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold flex items-center gap-2 border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> System Online
          </span>
        </div>
      </div>

      {(e3?.message.includes('requires an index') || e4?.message.includes('requires an index')) && (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-xl flex items-center gap-2 mb-4">
          <AlertTriangle size={20}/>
          <span>System Note: Database indexes are missing. Please check your browser console for creation links to fix Stats.</span>
        </div>
      )}

      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard title="Total Users" value={users.length} icon={<Users />} color="bg-blue-500" trend="+12%" loading={l1} onClick={() => navigateTo('users')} />
              <StatCard title="Sermons" value={sermons.length} icon={<BookOpen />} color="bg-purple-500" loading={l2} onClick={() => navigateTo('sermons')} />
              <StatCard title="Pending Testimonies" value={testimonies.length} icon={<MessageCircle />} color="bg-orange-500" loading={l3} onClick={() => navigateTo('testimonies')} />
              <StatCard title="Prayer Requests" value={prayers.length} icon={<Heart />} color="bg-pink-500" trend="Active" loading={l4} />
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h3 className="font-bold text-2xl mb-6 relative z-10 font-serif">Storage Status</h3>
              <div className="relative z-10">
                <div className="flex justify-between mb-2 text-sm font-medium text-blue-100">
                  <span>22.5 GB Used</span>
                  <span>50 GB Total</span>
                </div>
                <div className="h-4 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full bg-white w-[45%] rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <RecentActivityFeed />
          </div>
        </div>
      )}

      {activeSubTab === 'sermons' && <AdminSermonManager />}
      {activeSubTab === 'users' && <AdminUserManager />}
      {activeSubTab === 'gallery' && <AdminGalleryManager />}
      {activeSubTab === 'quiz' && <AdminQuizManager />}
      {activeSubTab === 'testimonies' && <AdminTestimonyManager />}
    </div>
  );
};

export default AdminDashboardScreen;