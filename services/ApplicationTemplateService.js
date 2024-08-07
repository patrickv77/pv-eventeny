const { application_template } = require('../db/models');

/**
 * @class ApplicationTemplateService
 * @classdesc Service class for handling application template-related operations.
 */
class ApplicationTemplateService {
  /**
   * Retrieves a list of all application templates.
   * @function getApplicationTemplatesList
   * @memberof ApplicationTemplateService
   * @async
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of application templates.
   * @throws {Error} - Throws an error if there is an issue retrieving the application templates.
   */
  getApplicationTemplatesList = async () => {
    try {
      const templatesList = await application_template.findAll();

      return templatesList;
    } catch (error) {
      throw new Error('Error in getApplicationTemplatesList');
    }
  };
  /**
   * Creates a new application template.
   * @function createApplicationTemplate
   * @memberof ApplicationTemplateService
   * @async
   * @param {string} vendorType - The type of vendor for the application template.
   * @returns {Promise<Object>} - A promise that resolves to the created application template object.
   * @throws {Error} - Throws an error if there is an issue creating the application template.
   */
  createApplicationTemplate = async (vendorType) => {
    try {
      const newTemplate = await application_template.create({
        vendor_type: vendorType,
      });

      return newTemplate;
    } catch (error) {
      throw new Error('Error in createApplicationTemplate');
    }
  };
  /**
   * Retrieves a list of vendor types from application templates.
   * @function getVendorTypesList
   * @memberof ApplicationTemplateService
   * @async
   * @returns {Promise<Array<string>>} - A promise that resolves to an array of vendor types.
   * @throws {Error} - Throws an error if there is an issue retrieving the vendor types.
   */
  getVendorTypesList = async () => {
    try {
      const vendorArray = [];

      await application_template
        .findAll()
        .then((app) =>
          app.map((template) => vendorArray.push(template.vendor_type))
        );

      return vendorArray;
    } catch (error) {
      throw new Error('Error in getVendorTypes');
    }
  };
}

module.exports = ApplicationTemplateService;
