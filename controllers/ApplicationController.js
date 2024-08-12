const express = require('express')
const ApplicationService = require('../services/ApplicationService');

/**
 * @class ApplicationController
 * @classdesc Controller class for handling application-related operations.
 */
class ApplicationController {
  applicationService = new ApplicationService();
  /**
   * Retrieves applications for the dashboard view.
   * If the user is an admin, it retrieves all applications.
   * Otherwise, it retrieves applications submitted by the user.
   * @function getApplications
   * @memberof ApplicationController
   * @async
   * @param {express.Request} req 
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  getApplications = async (req, res, next) => {
    const { id, username, role } = req.user;

    try {
      const dash = {};
      dash.role = role;
      dash.user = username;

      if (role === 'admin') {
        const apps = await this.applicationService.getAllApplications();
        dash.applicationList = apps;
      } else {
        const ownApps = await this.applicationService.getOwnApplications(id);
        dash.applicationList = ownApps;
      }

      return res.status(302).render('dashboard', { dash });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Updates the status of an application in the database.
   * @function updateApplicationStatus
   * @memberof ApplicationController
   * @async
   * @param {express.Request} req 
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  updateApplicationStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await this.applicationService.updateStatus(id, status);

      return res.status(200).json('Successfully updated status.');
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Create a new application for the logged in user.
   * @function submitUserApplication
   * @memberof ApplicationController
   * @async
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
      await this.applicationService.createUserApplication(
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
