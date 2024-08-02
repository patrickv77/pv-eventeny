const bcrypt = require('bcryptjs');

class ApplicationController {
  constructor(ApplicationService) {
    this.ApplicationService = ApplicationService;
  }

  getApplications = async (req, res, next) => {
    const { id, role } = req.user;

    try {
      const dash = {};
      dash.role = role;

      if (role === 'admin') {
        const apps = await this.ApplicationService.getAllApplications();
        dash.applicationList = apps;
      } else {
        const ownApps = await this.ApplicationService.getOwnApplications(id);
        dash.applicationList = ownApps;
      }

      res.status(302).render('dashboard', { dash });
    } catch (error) {
      return next(error);
    }
  };

  updateApplicationStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await this.ApplicationService.updateStatus(id, status);

      return res.status(200).json('Successfully updated status.');
    } catch (error) {
      return next(error);
    }
  };

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
      await this.ApplicationService.createUserApplication(
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
