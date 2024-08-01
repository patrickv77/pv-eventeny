class ApplicationService {
  constructor(application, user, application_template){
    this.application = application;
    this.user = user;
    this.application_template = application_template;
  }

  getAllApplications = async () => {
    try {
      const apps = await this.application.findAll({
        include: [
          {
            model: this.user,
            attributes: ['username'],
          },
          {
            model: this.application_template,
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
      
      // console.log(apps);
      return apps;
    } catch (error) {
      throw new Error('Error in getAllApplications');
    }
  }

  getOwnApplications = async (id) => {
    try {
      const apps = await this.application.findAll({
        include: [
          {
            model: this.user,
            where: { id: id },
            attributes: ['username'],
          },
          {
            model: this.application_template,
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

      console.log(apps[0].user);
      console.log(apps[0].application_template);
      return apps;
    } catch (error) {
        throw new Error('Error in getOwnApplications');
    }
  };

  updateStatus = async (id, status) => {
    try {
      const updatedApp = await this.application.update({ status: status }, { where: { id: id } });

      return updatedApp;
    } catch (error) {
      throw new Error('Error updating status');
    }
    
  }

  createUserApplication = async (id, vendorType, firstName, lastName, phoneNumber, email, description) => {
    try {
      let app;

      await this.application_template.findOne({ where: { vendor_type: vendorType }, attributes: ['id']})
        .then( async foundTemplate =>{  
          app = await this.application.create({
            user_id: id,
            vendor_type_id: foundTemplate.id,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            description: description,
            status: 'awaiting_action',
          });
        })
    
      return app;
    } catch (error) {
        throw new Error('error creatin');
    }
  }
}


module.exports = ApplicationService;