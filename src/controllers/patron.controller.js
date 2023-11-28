// controllers/patronController.js
const Patron = require('../models/patron.model');
const errorHandler = require('../utils/errorHandler.utils');

exports.addPatron = async (req, res) => {
  const { name, contactDetails } = req.body;

  try {
    let patron = new Patron({
      name,
      contactDetails,
    });

    await patron.save();

    res.json(patron);
  } catch (error) {
    console.error(error.message);
    errorHandler.handleError(res, 500, 'Internal Server Error');
  }
};

exports.getPatron = async (req, res) => {
    const patronId = req.params.id;
  
    try {
      const patron = await Patron.findById(patronId);
  
      if (!patron) {
        return res.status(404).json({ message: 'Patron not found' });
      }
  
      res.json(patron);
    } catch (error) {
      console.error(error.message);
      errorHandler.handleError(res, 500, 'Internal Server Error');
    }
};
  
  exports.updatePatron = async (req, res) => {
    const patronId = req.params.id;
    const { name, contactDetails } = req.body;
  
    try {
      let patron = await Patron.findById(patronId);
  
      if (!patron) {
        return res.status(404).json({ message: 'Patron not found' });
      }
  
      // Update patron details
      patron.name = name || patron.name;
      patron.contactDetails = contactDetails || patron.contactDetails;
  
      await patron.save();
  
      res.json(patron);
    } catch (error) {
      console.error(error.message);
      errorHandler.handleError(res, 500, 'Internal Server Error');
    }
  };
  
 exports.deletePatron = async (req, res) => {
    const patronId = req.params.id;
  
    try {
      const patron = await Patron.findById(patronId);
  
      if (!patron) {
        return res.status(404).json({ message: 'Patron not found' });
      }
  
      await patron.remove();
  
      res.json({ message: 'Patron deleted successfully' });
    } catch (error) {
      console.error(error.message);
      errorHandler.handleError(res, 500, 'Internal Server Error');
    }
};
  
exports.listPatrons = async (req, res) => {
    try {
      const patrons = await Patron.find();
  
      res.json(patrons);
    } catch (error) {
      console.error(error.message);
      errorHandler.handleError(res, 500, 'Internal Server Error');
    }
};
  
exports.searchPatrons = async (req, res) => {
    const { name } = req.query;
  
    try {
      let query = {};
  
      if (name) {
        query.name = { $regex: new RegExp(name, 'i') };
      }
  
      const patrons = await Patron.find(query);
  
      res.json(patrons);
    } catch (error) {
      console.error(error.message);
      errorHandler.handleError(res, 500, 'Internal Server Error');
    }
  };


