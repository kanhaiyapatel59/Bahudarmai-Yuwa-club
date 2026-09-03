import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import './i18n/config';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Activities from './pages/Activities';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import NewsNoticePage from './pages/NewsNoticePage';
import ArticleDetail from './pages/ArticleDetail';
import GalleryPage from './pages/GalleryPage';
import AchievementsPage from './pages/AchievementsPage';
import LeadershipPage from './pages/LeadershipPage';
import JoinMembership from './pages/JoinMembership';
import VolunteerPage from './pages/VolunteerPage';
import BloodDonationPage from './pages/BloodDonationPage';
import CommunityHelpPage from './pages/CommunityHelpPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Member Portal
import MemberDashboard from './pages/MemberDashboard';

// Admin Dashboard
import AdminLayout from './layouts/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminMembers from './pages/admin/AdminMembers';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminEvents from './pages/admin/AdminEvents';
import AdminNewsNotices from './pages/admin/AdminNewsNotices';
import AdminGallery from './pages/admin/AdminGallery';
import AdminLeadership from './pages/admin/AdminLeadership';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminBloodDonors from './pages/admin/AdminBloodDonors';
import AdminHelpRequests from './pages/admin/AdminHelpRequests';
import AdminDonations from './pages/admin/AdminDonations';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSiteSettings from './pages/admin/AdminSiteSettings';

// Layout wrapper for public pages with Navbar & Footer
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 w-full max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Guard for authenticated member routes
const MemberRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

// Guard for administrative roles
const AdminRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  const adminRoles = ['super_admin', 'admin', 'event_manager', 'volunteer_coordinator', 'content_manager'];
  return user && adminRoles.includes(user.role) ? <Outlet /> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            {/* Public Website Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/:category" element={<Activities />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetail />} />
              <Route path="/news" element={<NewsNoticePage />} />
              <Route path="/news/:slug" element={<ArticleDetail />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/join" element={<JoinMembership />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/blood-donation" element={<BloodDonationPage />} />
              <Route path="/help" element={<CommunityHelpPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Member Portal Protected Route */}
              <Route element={<MemberRoute />}>
                <Route path="/member" element={<MemberDashboard />} />
              </Route>
            </Route>

            {/* Admin Dashboard Protected Routes */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminOverview />} />
                <Route path="/admin/members" element={<AdminMembers />} />
                <Route path="/admin/volunteers" element={<AdminVolunteers />} />
                <Route path="/admin/events" element={<AdminEvents />} />
                <Route path="/admin/news" element={<AdminNewsNotices />} />
                <Route path="/admin/gallery" element={<AdminGallery />} />
                <Route path="/admin/leadership" element={<AdminLeadership />} />
                <Route path="/admin/achievements" element={<AdminAchievements />} />
                <Route path="/admin/blood-donors" element={<AdminBloodDonors />} />
                <Route path="/admin/help-requests" element={<AdminHelpRequests />} />
                <Route path="/admin/donations" element={<AdminDonations />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
                <Route path="/admin/settings" element={<AdminSiteSettings />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}
