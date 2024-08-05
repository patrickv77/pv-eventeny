const express = require('express')
const ApplicationService = require('../services/ApplicationService');
const applicationService = new ApplicationService;

/**
 * Controller for handling application-related operations.
 */
class ApplicationController {
  /**
   * Retrieves applications for the dashboard view.
   * If the user is an admin, it retrieves all applications.
   * Otherwise, it retrieves applications submitted by the user.
   * @param {express.Request} req 
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  getApplications = async (req, res, next) => {
    const { id, role } = req.user;

    try {
      const dash = {};
      dash.role = role;

      if (role === 'admin') {
        const apps = await applicationService.getAllApplications();
        dash.applicationList = apps;
      } else {
        const ownApps = await applicationService.getOwnApplications(id);
        dash.applicationList = ownApps;
      }

      res.status(302).render('dashboard', { dash });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Updates the status of an application in the database.
   * @param {express.Request} req 
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  updateApplicationStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await applicationService.updateStatus(id, status);

      return res.status(200).json('Successfully updated status.');
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Create a new application for the logged in user.
   * @param {express.Request} req 
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  submitUserApplication = async (req, res, next) => {
    const { id } = req.user;
    const {
      vendorType,
      first_name,
      last_name,
      phone_number,
      email,
      description,
    } = req.body;

    try {
      await applicationService.createUserApplication(
        id,
        vendorType,
        first_name,
        last_name,
        phone_number,
        email,
        description
      );

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = ApplicationController;
