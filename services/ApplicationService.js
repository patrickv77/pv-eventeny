const { user, application, application_template } = require('../db/models');

/**
 * Service class for handling application-related operations.
 */
class ApplicationService {
  /**
   * Retrieves all applications from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of application objects.
   * @throws {Error} If an error occurs while fetching the applications.
   */
  getAllApplications = async () => {
    try {
      const apps = await application.findAll({
        include: [
          {
            model: user,
            attributes: ['username'],
          },
          {
            model: application_template,
            attributes: ['vendor_type'],
          },
        ],
        attributes: [
          'id',
          'first_name',
          'last_name',
          'phone_number',
          'email',
          'vendor_type_id',
          'description',
          'status',
        ],
      });

      return apps;
    } catch (error) {
      throw new Error('Error in getAllApplications');
    }
  };
  /**
   * Retrieves all applications submitted by the user (non-admin).
   * @param {number} id The ID of the logged in user.
   * @returns {Promise<Array>} A promise that resolves to an array of application objects.
   * @throws {Error} If an error occurs while fetching the applications.
   */
  getOwnApplications = async (id) => {
    try {
      const apps = await application.findAll({
        include: [
          {
            model: user,
            where: { id: id },
            attributes: ['username'],
          },
          {
            model: application_template,
            attributes: ['vendor_type'],
          },
        ],
        attributes: [
          'id',
          'first_name',
          'last_name',
          'phone_number',
          'email',
          'vendor_type_id',
          'description',
          'status',
        ],
      });

      return apps;
    } catch (error) {
      throw new Error('Error in getOwnApplications');
    }
  };

  /**
   * Updates the status of an existing application.
   * @param {number} appId - The ID of the application to update.
   * @param {string} status - The new status of the application.
   * @returns {Promise<number>} A promise that resolves to the number of updated rows.
   * @throws {Error} If an error occurs while updating the status.
   */
  updateStatus = async (appId, status) => {
    try {
      const updatedApp = await application.update(
        { status: status },
        { where: { id: appId } }
      );

      return updatedApp;
    } catch (error) {
      throw new Error('Error updating status');
    }
  };

   /**
   * Creates a new user application.
   * @param {number} id - The ID of the user.
   * @param {string} vendorType - The type of vendor.
   * @param {string} firstName - The first name of the applicant.
   * @param {string} lastName - The last name of the applicant.
   * @param {string} phoneNumber - The phone number of the applicant.
   * @param {string} email - The email address of the applicant.
   * @param {string} description - The description of the application.
   * @returns {Promise<Object>} A promise that resolves to the created application object.
   * @throws {Error} If an error occurs while creating the application.
   */
  createUserApplication = async (
    id,
    vendorType,
    firstName,
    lastName,
    phoneNumber,
    email,
    description
  ) => {
    try {
      let app;

      await application_template
        .findOne({ where: { vendor_type: vendorType }, attributes: ['id'] })
        .then(async (foundTemplate) => {
          app = await application.create({
            user_id: id,
            vendor_type_id: foundTemplate.id,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            description: description,
            status: 'awaiting_action',
          });
        });

      return app;
    } catch (error) {
      throw new Error('error creatin');
    }
  };
}

module.exports = ApplicationService;
