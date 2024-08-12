const ApplicationService = require('../../services/ApplicationService');
const { application, application_template } = require('../../db/models');

//inline comment above each test to describe what it does
describe('ApplicationService', () => {
  let applicationService;

  beforeEach(() => {
    applicationService = new ApplicationService();
  });

  describe('getAllApplications', () => {
    it('should retrieve all applications', async () => {
      application.findAll = jest.fn().mockResolvedValue([{ id: 1 }]);

      const result = await applicationService.getAllApplications();

      expect(result).toEqual([{ id: 1 }]);
      expect(application.findAll).toHaveBeenCalled();
    }); 

    it('should throw an error if query fails', async () => {
      application.findAll = jest.fn().mockRejectedValue();

      await expect(applicationService.getAllApplications()).rejects.toThrow('Error in getAllApplications');
    });
  });

  describe('getOwnApplications', () => {
    it('should retrieve own applications for a user', async () => {
      const userId = 1;
      application.findAll = jest.fn().mockResolvedValue([{ id: 1 }]);

      const result = await applicationService.getOwnApplications(userId);

      expect(result).toEqual([{ id: 1 }]);
      expect(application.findAll).toHaveBeenCalled();
    });

    it('should throw an error if query fails', async () => {
      application.findAll = jest.fn().mockRejectedValue();

      await expect(applicationService.getOwnApplications(1)).rejects.toThrow('Error in getOwnApplications');
    });
  });

  describe('updateStatus', () => {
    it('should update application status', async () => {
      const applicationId = 1;
      const status = 'approved';
      application.update = jest.fn().mockResolvedValue([1]);

      const result = await applicationService.updateStatus(applicationId, status);

      expect(result).toEqual([1]);
      expect(application.update).toHaveBeenCalledWith({ status }, { where: { id: applicationId } });
    });

    it('should throw an error if update fails', async () => {
      application.update = jest.fn().mockRejectedValue();

      await expect(applicationService.updateStatus(1, 'approved')).rejects.toThrow('Error in updateStatus');
    });
  });

  describe('createUserApplication', () => {
    it('should create a new application', async () => {
      const data = {
        user_id: 1,
        vendor_type_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '1234567890',
        email: 'john.doe@example.com',
        description: 'Test description',
      };
      application_template.findOne = jest.fn().mockResolvedValue({ id: 1 });
      application.create = jest.fn().mockResolvedValue({ id: 1 });

      const result = await applicationService.createUserApplication(data.user_id, data.vendor_type_id, data.first_name, data.last_name, data.phone_number, data.email, data.description);

      expect(result).toEqual({ id: 1 });
      expect(application.create).toHaveBeenCalledWith({"description": "Test description", "email": "john.doe@example.com", "first_name": "John", "last_name": "Doe", "phone_number": "1234567890", "status": "awaiting_action", "user_id": 1, "vendor_type_id": 1});
    });

    it('should throw an error if creation fails', async () => {
      application.create = jest.fn().mockRejectedValue();

      await expect(applicationService.createUserApplication({})).rejects.toThrow('Error in createUserApplication');
    });
  });
});