const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const Company = require('../models/company');


router.get('/', async (req, res, next) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    next(err);
  }
});


router.get('/:companyId', async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.companyId);
    res.json(company);
  } catch (err) {
    next(err);
  }
});


router.post('/', isAdmin, async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
});


router.put('/:companyId', isAdmin, async (req, res, next) => {
  try {
    const company = await Company.update(req.params.companyId, req.body);
    res.json(company);
  } catch (err) {
    next(err);
  }
});


router.delete('/:companyId', isAdmin, async (req, res, next) => {
  try {
    await Company.delete(req.params.companyId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;