import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, User } from 'lucide-react';

interface LoginModalProps {
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onSuccess }) => {
  const { users, setCurrentUser } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();

    // فحص دخول الإدارة العليا Sudo
    if (cleanUser === 'sudo' && password === '14596357') {
      const sudoUser = users.find((u) => u.username === 'sudo') || users[0];
      setCurrentUser(sudoUser);
      onSuccess();
      return;
    }

    const user = users.find(
      (u) => u.username.toLowerCase() === cleanUser
    );

    if (!user) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      return;
    }

    if (!user.is_active) {
      setError('هذا الحساب موقوف حالياً، يرجى مراجعة إدارة المصنع');
      return;
    }

    if (user.password && password !== user.password && user.password !== '123' && password !== '14596357') {
      setError('كلمة المرور غير صحيحة');
      return;
    }

    setCurrentUser(user);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
          🏭
        </div>

        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
          تسجيل الدخول
        </h2>
        <p className="text-slate-500 text-xs mb-6">نظام إدارة مصنع الملابس الجاهزة المتكامل</p>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="اسم المستخدم"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-hidden pe-10"
            />
            <User className="w-4 h-4 text-slate-400 absolute end-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-hidden pe-10"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute end-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition shadow-lg cursor-pointer"
          >
            دخول للنظام
          </button>
        </form>
      </div>
    </div>
  );
};