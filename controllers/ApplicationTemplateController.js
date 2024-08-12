const express = require('express');
const ApplicationTemplateService = require('../services/ApplicationTemplateService')

/**
 * @class ApplicationTemplateController
 * @classdesc Controller class for handling application template-related operations.
 */
class ApplicationTemplateController {
  applicationTemplateService = new ApplicationTemplateService();
  /**
   * Retrieves all application templates for the adminApplicationTemplate view.
   * @function getAllApplicationTemplates
   * @memberof ApplicationTemplateController
   * @async
   * @param {express.Request} req 
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  getAllApplicationTemplates = async (req, res, next) => {
    const { username } = req.user;

    try {
      const applicationTemplates = {};
      applicationTemplates.user = username;

      applicationTemplates.list = await this.applicationTemplateService.getApplicationTemplatesList();

      return res.render('adminApplicationTemplates', { applicationTemplates })
    } catch (error) {
      return next(error)
    }
  }
  /**
   * Add a new application template to the database.
   * @function createNewApplicationTemplate
   * @memberof ApplicationTemplateController
   * @async
   * @param {express.Request} req 
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  createNewApplicationTemplate = async (req, res, next) => {
    const { vendor_type } = req.body;

    try {
      await this.applicationTemplateService.createApplicationTemplate(vendor_type);

      return res.status(302).redirect('/template');
    } catch (error) {
      return next(error)
    }
  }
  /**
   * Load createNewTemplate view
   * @function loadTemplateForm
   * @memberof ApplicationTemplateController
   * @param {express.Request} req 
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  loadTemplateForm = (req, res, next) => {
    try {
      return res.status(200).render('createNewTemplate');
    } catch (error) {
      return next(error)
    }
  }
  /**
   * Get a list of all vendor types that exist among application templates.
   * @function getAllVendorTypes
   * @memberof ApplicationTemplateController
   * @async
   * @param {express.Request} req 
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  getAllVendorTypes = async (req, res, next) => {
    const { username } = req.user;

    try {
      const vendorTypes = {};
      vendorTypes.user = username;

      vendorTypes.list = await this.applicationTemplateService.getVendorTypesList();

      return res.render('userSubmitApplication', { vendorTypes })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = ApplicationTemplateController;