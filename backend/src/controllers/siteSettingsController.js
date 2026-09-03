import SiteSettings from '../models/SiteSettings.js';
import Member from '../models/Member.js';
import Event from '../models/Event.js';
import HelpRequest from '../models/HelpRequest.js';
import BloodDonor from '../models/BloodDonor.js';
import EventRegistration from '../models/EventRegistration.js';

export const getSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({
        heroTitle: { en: 'Bahudarmai Yuwa Club', ne: 'बहुदरमाई युवा क्लब' },
        heroSubtitle: {
          en: 'Bahudarmai Municipality-02, Pipra (Parsa) • Estd. 2080 BYC',
          ne: 'बहुदरमाई न.पा.-२, पिपरा (पर्सा) • स्था. २०८० BYC',
        },
      });
    }

    // Compute real dynamic counts from database
    const [
      realMembersCount,
      realEventsCount,
      realHelpRequestsCount,
      realBloodDonorsCount,
    ] = await Promise.all([
      Member.countDocuments(),
      Event.countDocuments(),
      HelpRequest.countDocuments(),
      BloodDonor.countDocuments(),
    ]);

    const calculatedPeopleReached = (realMembersCount * 12) + (realEventsCount * 25) + (realHelpRequestsCount * 15) + (realBloodDonorsCount * 20);

    const settingsObj = settings.toObject();

    // Respect user's saved admin site settings if configured, otherwise use real counts
    settingsObj.stats = {
      youthMembers: settings.stats?.youthMembers !== undefined ? settings.stats.youthMembers : realMembersCount,
      communityEvents: settings.stats?.communityEvents !== undefined ? settings.stats.communityEvents : realEventsCount,
      socialInitiatives: settings.stats?.socialInitiatives !== undefined ? settings.stats.socialInitiatives : realHelpRequestsCount,
      peopleReached: settings.stats?.peopleReached !== undefined ? settings.stats.peopleReached : calculatedPeopleReached,
    };

    res.json({ success: true, settings: settingsObj });
  } catch (error) {
    next(error);
  }
};

export const updateSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
    }

    res.json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};
