import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { eventService } from '../services/api';
import BilingualText from '../components/common/BilingualText';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import StatusBadge from '../components/common/StatusBadge';
import { formatDate } from '../utils/dateFormatter';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';

export const Events = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await eventService.getEvents({
        status: statusFilter,
        category: categoryFilter,
        search: searchTerm,
      });
      if (res.data.success) {
        setEvents(res.data.events);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [statusFilter, categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('events.title')}
        </h1>
        <p className="text-slate-600 text-sm">
          Explore upcoming youth sports tournaments, community health camps, and volunteer drives.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {[
            { label: t('events.all'), value: '' },
            { label: t('events.upcoming'), value: 'upcoming' },
            { label: t('events.ongoing'), value: 'ongoing' },
            { label: t('events.completed'), value: 'completed' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors ${
                statusFilter === tab.value
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('forms.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Event Cards Grid */}
      {loading ? (
        <LoadingSpinner message="Fetching community events..." />
      ) : events.length === 0 ? (
        <EmptyState
          title="No events found"
          description="Try changing your search keywords or filter tab."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <img
                    src={event.bannerImage}
                    alt="Event"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={event.status} type="event" />
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                    {event.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center text-xs font-semibold text-emerald-700 gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.startDate, currentLang)}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
                    <BilingualText content={event.title} />
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    <BilingualText content={event.description} />
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">
                      <BilingualText content={event.location} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <Link
                  to={`/events/${event.slug}`}
                  className="w-full text-center py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
                >
                  {t('home.featuredEvents.details')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
