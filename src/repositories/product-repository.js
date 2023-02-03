"use strict";
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = async () => {
  const product = await Product.find(
    {
      active: true,
    },
    "title price slug"
  );
  return product;
};

exports.getBySlug = async (slug) => {
  const product = await Product.findOne(
    { slug: slug, active: true },
    "title description price slug tags"
  );
  return product;
};

exports.getById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.getByTag = async (tag) => {
  const product = Product.find(
    { tags: tag, active: true },
    "title description price slug tags"
  );
  return product;
};

exports.create = async (body) => {
  var product = new Product(body);
  await product.save();
};

exports.update = async (id, body) => {
  await Product.findByIdAndUpdate(id, {
    $set: {
      title: body.title,
      description: body.description,
      slug: body.slug,
      price: body.price,
    },
  });
};

exports.delete = async (id) => {
  await Product.findByIdAndRemove(id);
};
