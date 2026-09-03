import GalleryAlbum from '../models/GalleryAlbum.js';

export const getGalleryAlbums = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = {};
    if (category) query.category = category;

    const albums = await GalleryAlbum.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: albums.length, albums });
  } catch (error) {
    next(error);
  }
};

export const getGalleryAlbumById = async (req, res, next) => {
  try {
    const album = await GalleryAlbum.findById(req.params.id);
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.json({ success: true, album });
  } catch (error) {
    next(error);
  }
};

export const createGalleryAlbum = async (req, res, next) => {
  try {
    const album = await GalleryAlbum.create(req.body);
    res.status(201).json({ success: true, album });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryAlbum = async (req, res, next) => {
  try {
    const album = await GalleryAlbum.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.json({ success: true, album });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryAlbum = async (req, res, next) => {
  try {
    const album = await GalleryAlbum.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.json({ success: true, message: 'Album deleted' });
  } catch (error) {
    next(error);
  }
};
