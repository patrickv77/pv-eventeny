class ApplicationTemplateService {
  constructor(application_template) {
    this.application_template = application_template;
  }

  getApplicationTemplatesList = async () => {
    try {
      const templatesList = await this.application_template.findAll();

      return templatesList;
    } catch (error) {
      throw new Error('Error in getApplicationTemplatesList');
    }
  };

  createApplicationTemplate = async (vendorType) => {
    try {
      const newTemplate = await this.application_template.create({
        vendor_type: vendorType,
      });

      return newTemplate;
    } catch (error) {
      throw new Error('Error in createApplicationTemplate');
    }
  };

  getVendorTypesList = async () => {
    try {
      const vendorArray = [];

      await this.application_template
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
