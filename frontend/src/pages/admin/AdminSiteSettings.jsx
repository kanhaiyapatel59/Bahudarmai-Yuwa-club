import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { siteSettingsService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ImageInput from '../../components/common/ImageInput';
import { Save, CheckCircle2 } from 'lucide-react';

export const AdminSiteSettings = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const [form, setForm] = useState({
    heroTitleEn: '',
    heroTitleNe: '',
    heroSubtitleEn: '',
    heroSubtitleNe: '',
    youthMembers: 520,
    communityEvents: 54,
    socialInitiatives: 28,
    peopleReached: 1250,
    presidentNameEn: '',
    presidentNameNe: '',
    presidentTitleEn: '',
    presidentTitleNe: '',
    presidentMessageEn: '',
    presidentMessageNe: '',
    presidentPhoto: '',
    contactPhone: '9767721133',
    contactEmail: 'info@byc.org.np',
    contactAddressEn: '',
    contactAddressNe: '',
    facebook: '',
    instagram: '',
  });

  useEffect(() => {
    siteSettingsService.getPublic().then((res) => {
      if (res.data.success && res.data.settings) {
        const s = res.data.settings;
        setForm({
          heroTitleEn: s.heroTitle?.en || '',
          heroTitleNe: s.heroTitle?.ne || '',
          heroSubtitleEn: s.heroSubtitle?.en || '',
          heroSubtitleNe: s.heroSubtitle?.ne || '',
          youthMembers: s.stats?.youthMembers || 520,
          communityEvents: s.stats?.communityEvents || 54,
          socialInitiatives: s.stats?.socialInitiatives || 28,
          peopleReached: s.stats?.peopleReached || 1250,
          presidentNameEn: s.presidentMessage?.name?.en || '',
          presidentNameNe: s.presidentMessage?.name?.ne || '',
          presidentTitleEn: s.presidentMessage?.title?.en || '',
          presidentTitleNe: s.presidentMessage?.title?.ne || '',
          presidentMessageEn: s.presidentMessage?.message?.en || '',
          presidentMessageNe: s.presidentMessage?.message?.ne || '',
          presidentPhoto: s.presidentMessage?.photo || '',
          contactPhone: s.contactInfo?.phone || '9767721133',
          contactEmail: s.contactInfo?.email || 'info@byc.org.np',
          contactAddressEn: s.contactInfo?.address?.en || '',
          contactAddressNe: s.contactInfo?.address?.ne || '',
          facebook: s.socialLinks?.facebook || '',
          instagram: s.socialLinks?.instagram || '',
        });
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(false);
    try {
      const payload = {
        heroTitle: { en: form.heroTitleEn, ne: form.heroTitleNe },
        heroSubtitle: { en: form.heroSubtitleEn, ne: form.heroSubtitleNe },
        stats: {
          youthMembers: Number(form.youthMembers),
          communityEvents: Number(form.communityEvents),
          socialInitiatives: Number(form.socialInitiatives),
          peopleReached: Number(form.peopleReached),
        },
        presidentMessage: {
          name: { en: form.presidentNameEn, ne: form.presidentNameNe },
          title: { en: form.presidentTitleEn, ne: form.presidentTitleNe },
          message: { en: form.presidentMessageEn, ne: form.presidentMessageNe },
          photo: form.presidentPhoto || '/byc_committee_banner.jpg',
        },
        contactInfo: {
          phone: form.contactPhone,
          email: form.contactEmail,
          address: { en: form.contactAddressEn, ne: form.contactAddressNe },
        },
        socialLinks: {
          facebook: form.facebook,
          instagram: form.instagram,
        },
      };

      const res = await siteSettingsService.update(payload);
      if (res.data.success) {
        setSuccessMsg(true);
      }
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading site configuration..." />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.settings')}</h1>
        <p className="text-xs text-slate-500">Configure homepage hero text, dynamic stats counter numbers, leadership messages, and contact details in both English & Nepali.</p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Site settings updated successfully! Public website changes are live.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-8">
        {/* Section 1: Hero Section Text */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Hero Section Content (Bilingual)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Title (English)</label>
              <input
                type="text"
                value={form.heroTitleEn}
                onChange={(e) => setForm({ ...form, heroTitleEn: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Title (नेपाली)</label>
              <input
                type="text"
                value={form.heroTitleNe}
                onChange={(e) => setForm({ ...form, heroTitleNe: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subtitle (English)</label>
              <textarea
                rows="2"
                value={form.heroSubtitleEn}
                onChange={(e) => setForm({ ...form, heroSubtitleEn: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subtitle (नेपाली)</label>
              <textarea
                rows="2"
                value={form.heroSubtitleNe}
                onChange={(e) => setForm({ ...form, heroSubtitleNe: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section 2: Statistics Counter Numbers */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            2. Impact Counter Numbers (Configurable)
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Youth Members</label>
              <input
                type="number"
                value={form.youthMembers}
                onChange={(e) => setForm({ ...form, youthMembers: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Community Events</label>
              <input
                type="number"
                value={form.communityEvents}
                onChange={(e) => setForm({ ...form, communityEvents: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Social Initiatives</label>
              <input
                type="number"
                value={form.socialInitiatives}
                onChange={(e) => setForm({ ...form, socialInitiatives: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-amber-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">People Reached</label>
              <input
                type="number"
                value={form.peopleReached}
                onChange={(e) => setForm({ ...form, peopleReached: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-purple-800"
              />
            </div>
          </div>
        </div>

        {/* Section 3: President Message */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            3. President Message Section
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">President Name (EN)</label>
              <input
                type="text"
                value={form.presidentNameEn}
                onChange={(e) => setForm({ ...form, presidentNameEn: e.target.value })}
                placeholder="Dhananjay Patel"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">अध्यक्षको नाम (नेपाली)</label>
              <input
                type="text"
                value={form.presidentNameNe}
                onChange={(e) => setForm({ ...form, presidentNameNe: e.target.value })}
                placeholder="धनञ्जय पटेल"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
              />
            </div>
          </div>

          <ImageInput
            label="President Photo"
            value={form.presidentPhoto}
            onChange={(imgVal) => setForm({ ...form, presidentPhoto: imgVal })}
            placeholder="https://..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message (English)</label>
              <textarea
                rows="3"
                value={form.presidentMessageEn}
                onChange={(e) => setForm({ ...form, presidentMessageEn: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">सन्देश (नेपाली)</label>
              <textarea
                rows="3"
                value={form.presidentMessageNe}
                onChange={(e) => setForm({ ...form, presidentMessageNe: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section 4: Contact & Address */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            4. Contact & Address Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Phone</label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                placeholder="9767721133"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Address (English)</label>
              <input
                type="text"
                value={form.contactAddressEn}
                onChange={(e) => setForm({ ...form, contactAddressEn: e.target.value })}
                placeholder="Bahudarmai Municipality-02, Pipra (Parsa), Nepal"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ठेगाना (नेपाली)</label>
              <input
                type="text"
                value={form.contactAddressNe}
                onChange={(e) => setForm({ ...form, contactAddressNe: e.target.value })}
                placeholder="बहुदरमाई न.पा.-२, पिपरा (पर्सा), नेपाल"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{submitting ? 'Saving Configuration...' : 'Save Site Settings'}</span>
        </button>
      </form>
    </div>
  );
};

export default AdminSiteSettings;
