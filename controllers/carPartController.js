const { CarPart } = require('../models/associations');

exports.getAll = async (req, res, next) => {
  try {
    const parts = await CarPart.findAll();
    res.json(parts);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const part = await CarPart.findByPk(req.params.id);
    if (!part) return res.status(404).json({ message: 'Car part not found' });
    res.json(part);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { brand_name, price, short_description, thumbnail_url, diagram_url } = req.body;
    const part = await CarPart.create({ brand_name, price, short_description, thumbnail_url, diagram_url });
    res.status(201).json(part);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const part = await CarPart.findByPk(req.params.id);
    if (!part) return res.status(404).json({ message: 'Car part not found' });
    const { brand_name, price, short_description, thumbnail_url, diagram_url } = req.body;
    part.brand_name = brand_name || part.brand_name;
    part.price = price || part.price;
    part.short_description = short_description || part.short_description;
    part.thumbnail_url = thumbnail_url || part.thumbnail_url;
    part.diagram_url = diagram_url || part.diagram_url;
    await part.save();
    res.json(part);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const part = await CarPart.findByPk(req.params.id);
    if (!part) return res.status(404).json({ message: 'Car part not found' });
    await part.destroy();
    res.json({ message: 'Car part deleted' });
  } catch (err) {
    next(err);
  }
}; 