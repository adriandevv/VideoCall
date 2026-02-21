import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function Settings() {
    const { user, updateProfile, updateAvatar, logout } = useAuthStore();

    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');

    // UI state
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Update local state if the user object changes (e.g. on first load)
    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ text: '', type: '' });

        try {
            await updateProfile({ username, email });
            setMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (error: any) {
            setMessage({
                text: error.response?.data?.error || 'Failed to update profile.',
                type: 'error'
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ text: 'Image must be smaller than 5MB', type: 'error' });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                const base64String = reader.result as string;
                setIsSaving(true);
                await updateAvatar(base64String);
                setMessage({ text: 'Avatar updated successfully!', type: 'success' });
            } catch (error: any) {
                setMessage({
                    text: error.response?.data?.error || 'Failed to upload avatar.',
                    type: 'error'
                });
            } finally {
                setIsSaving(false);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Account Settings</h1>

            {message.text && (
                <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 dark:bg-green-500/10 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-500/20' : 'bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                    }`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white dark:bg-[#1c1a2e] border border-slate-200 dark:border-[#2b2839] shadow-sm rounded-2xl mb-8 transition-colors">
                <div className="px-5 py-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        Profile Information
                    </h3>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center space-y-5">
                            <div className="h-32 w-32 rounded-full overflow-hidden bg-slate-100 dark:bg-[#11131a] border-2 border-slate-200 dark:border-[#2b2839] flex items-center justify-center transition-colors">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="Avatar" className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-slate-400 dark:text-slate-500 text-4xl font-display">{user?.username?.[0]?.toUpperCase() || '?'}</span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isSaving}
                                className="inline-flex items-center px-4 py-2 border border-slate-200 dark:border-[#2b2839] shadow-sm text-sm font-medium rounded-xl text-slate-700 dark:text-slate-300 bg-white dark:bg-[#11131a] hover:bg-slate-50 dark:hover:bg-[#2b2839]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-[#1c1a2e] disabled:opacity-50"
                            >
                                Change Avatar
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleProfileSubmit} className="flex-1 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Username</label>
                                <input
                                    type="text"
                                    required
                                    className="block w-full rounded-xl border border-slate-200 dark:border-[#2b2839] bg-slate-50 dark:bg-[#11131a] px-4 py-2.5 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#1c1a2e] transition-colors sm:text-sm"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="block w-full rounded-xl border border-slate-200 dark:border-[#2b2839] bg-slate-50 dark:bg-[#11131a] px-4 py-2.5 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#1c1a2e] transition-colors sm:text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="inline-flex justify-center rounded-xl bg-primary py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#1c1a2e] transition-colors disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white dark:bg-[#1c1a2e] border border-slate-200 dark:border-[#2b2839] shadow-sm rounded-2xl transition-colors">
                <div className="px-5 py-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        Danger Zone
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-slate-500 dark:text-[#a19db9] mb-6">
                        <p>Once you sign out, you will need to log back in to access your account.</p>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={logout}
                            className="inline-flex items-center justify-center px-5 py-2.5 font-medium rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#1c1a2e] focus:ring-red-500 sm:text-sm"
                        >
                            Sign out securely
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
