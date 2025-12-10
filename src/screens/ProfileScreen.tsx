import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Mail, Phone, Calendar, Building2, Edit2, Save, X } from 'lucide-react';

const ProfileScreen: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user.displayName || '',
    phoneNumber: user.phoneNumber || '',
    hostelName: user.hostelName || '',
    dateOfBirth: user.dateOfBirth || ''
  });

  const handleSave = async () => {
    // TODO: Update user profile in Firestore
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl animate-fade-in-up space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white flex items-end gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <img
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
            alt={user.displayName}
            className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl"
          />
        </div>
        <div className="relative z-10 pb-2">
          <h1 className="text-3xl font-serif font-bold mb-2">{user.displayName}</h1>
          <p className="text-blue-100 text-sm font-bold uppercase tracking-wide">{user.role}</p>
          <p className="text-blue-100 text-sm mt-1">{user.email}</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-serif dark:text-white">Personal Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
          >
            {isEditing ? (
              <>
                <X size={18} /> Cancel
              </>
            ) : (
              <>
                <Edit2 size={18} /> Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <Mail className="text-blue-600 dark:text-blue-400" size={24} />
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Email</p>
              <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
            </div>
          </div>

          {/* Display Name */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Full Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 dark:text-white"
                />
              ) : (
                <p className="font-bold text-sm truncate dark:text-white">{user.displayName}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <Phone className="text-purple-600 dark:text-purple-400" size={24} />
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Phone</p>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{formData.phoneNumber || 'Not provided'}</p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <Calendar className="text-pink-600 dark:text-pink-400" size={24} />
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Date of Birth</p>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{formData.dateOfBirth || 'Not provided'}</p>
              )}
            </div>
          </div>

          {/* Hostel Name */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <Building2 className="text-green-600 dark:text-green-400" size={24} />
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Hostel/Location</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.hostelName}
                  onChange={(e) => setFormData({ ...formData, hostelName: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{formData.hostelName || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-lg"
          >
            <Save size={20} /> Save Changes
          </button>
        )}
      </div>

      {/* Account Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold font-serif dark:text-white mb-6">Account Security</h2>
        <button className="w-full p-4 text-left bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700">
          <p className="font-bold dark:text-white">Change Password</p>
          <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;