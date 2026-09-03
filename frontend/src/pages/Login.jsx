import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, Mail } from 'lucide-react';

export const Login = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    try {
      const res = await login(email, password);
      if (res.user.role === 'member') {
        navigate('/member');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Invalid credentials. Check email and password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#02529C] flex items-center justify-center mx-auto mb-2">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('nav.login')}</h1>
          <p className={`text-xs text-slate-500 ${currentLang === 'ne' ? 'font-ne' : ''}`}>
            {currentLang === 'ne'
              ? 'बहुदरमाई युवा क्लब ड्यासबोर्डमा लगइन गर्नुहोस्'
              : 'Access your Member Portal or Executive Admin Dashboard'}
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl border border-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.email')} *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#02529C]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700">
                {currentLang === 'ne' ? 'पासवर्ड *' : 'Password *'}
              </label>
              <Link to="/forgot-password" className="text-[11px] font-bold text-[#02529C] hover:underline">
                {currentLang === 'ne' ? 'पासवर्ड बिर्सनुभयो?' : 'Forgot password?'}
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#02529C]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 text-xs font-bold text-white bg-[#02529C] hover:bg-[#013F7A] rounded-xl shadow-md transition-colors"
          >
            {submitting ? (currentLang === 'ne' ? 'लगइन हुँदैछ...' : 'Logging in...') : (currentLang === 'ne' ? 'लगइन गर्नुहोस्' : 'Login')}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {currentLang === 'ne' ? 'खाता छैन?' : "Don't have an account?"}{' '}
          <Link to="/register" className="font-bold text-[#02529C] hover:underline">
            {currentLang === 'ne' ? 'नयाँ दर्ता गर्नुहोस्' : 'Register Account'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
