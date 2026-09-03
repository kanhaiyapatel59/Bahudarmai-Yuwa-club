import NewsNotice from '../models/NewsNotice.js';

export const getNewsNotices = async (req, res, next) => {
  try {
    const { type, category, search, page = 1, limit = 9 } = req.query;
    const query = { isPublished: true };

    if (type) query.type = type;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.ne': { $regex: search, $options: 'i' } },
        { 'content.en': { $regex: search, $options: 'i' } },
        { 'content.ne': { $regex: search, $options: 'i' } },
      ];
    }

    const total = await NewsNotice.countDocuments(query);
    const items = await NewsNotice.find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: items.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      items,
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsNoticeBySlug = async (req, res, next) => {
  try {
    const item = await NewsNotice.findOne({ slug: req.params.slug });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Article or notice not found' });
    }
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

// Admin handlers
export const getAllNewsNoticesAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const total = await NewsNotice.countDocuments();
    const items = await NewsNotice.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: items.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      items,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewsNotice = async (req, res, next) => {
  try {
    const { type, title, content, category, featuredImage, author, isPublished } = req.body;

    const baseSlug = title.en ? title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : `post-${Date.now()}`;
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const item = await NewsNotice.create({
      type,
      slug,
      title,
      content,
      category: category || 'General',
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
      author: author || 'BYC Committee',
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

export const updateNewsNotice = async (req, res, next) => {
  try {
    const item = await NewsNotice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'News/Notice item not found' });
    }
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

export const deleteNewsNotice = async (req, res, next) => {
  try {
    const item = await NewsNotice.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'News/Notice item not found' });
    }
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
