class ApplicationTemplateController {
  constructor(ApplicationTemplateService) {
    this.ApplicationTemplateService = ApplicationTemplateService;
  }

  getAllApplicationTemplates = async (req, res, next) => {
    try {
      const applicationTemplatesList = await this.ApplicationTemplateService.getApplicationTemplatesList();

      return res.render('adminApplicationTemplates', { applicationTemplatesList })
    } catch (error) {
      return next(error)
    }
  }

  createNewApplicationTemplate = async (req, res, next) => {
    const { vendor_type } = req.body;

    try {
      await this.ApplicationTemplateService.createApplicationTemplate(vendor_type);

      return res.status(200).redirect('/template');
    } catch (error) {
      return next(error)
    }
  }

  loadTemplateForm = async (req, res, next) => {
    try {
      return res.status(302).render('createNewTemplate');
    } catch (error) {
      return next(error)
    }
  }
  
  getAllVendorTypes = async (req, res, next) => {
    try {
      const vendorTypes = await this.ApplicationTemplateService.getVendorTypesList();

      return res.render('userSubmitApplication', { vendorTypes })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = ApplicationTemplateController;