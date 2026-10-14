import { ServicesRepository } from "../repositories/services.repository.js";

const repository = new ServicesRepository();

export class ServicesService {

    async getServices() {
        return await repository.getAll();
    }
  
    async getServiceById(id) {
        return await repository.getById(id);
    }

    async createService(serviceData) {

        const services = await this.getServices();
        const requiredFields = [
         "name",
         "description",
         "duration",
         "price",
         "category",
         "available"
        ]; 

        const missingFields = requiredFields.filter(
         field => serviceData[field] === undefined ||
         serviceData[field] === null
        );

        if (missingFields.length > 0) {
        throw new Error(
        `Faltan campos obligatorios: ${missingFields.join(", ")}`
        )}

        const ids = services.map(service => service.id);

        const newId = ids.length > 0
           ? Math.max(...ids) + 1
           : 1;

        const newService = {
          ...serviceData,
            id: newId
        }

       return await repository.create(newService);
    }

    async updateService(id, updatedData) {

        const service = await this.getServiceById(id);

        if (!service) {
            return null;
        }

        const { id: ignoredId, ...safeData } = updatedData;

        Object.assign(service, safeData);

        return await repository.update(id, service);
    }

    async deleteService (id) {
        return await repository.delete(id);
    }

}