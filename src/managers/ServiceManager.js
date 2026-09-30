import { promises as fs } from "fs";
import path from "path";

const filePath = path.resolve("src/data/services.json");

class ServiceManager { 
   
    async getServices() {

        const data = await fs.readFile(filePath, "utf-8");
        const services = JSON.parse(data);

      return services;
    }

    async getServiceById(id) {

        const services = await this.getServices();
        const service = services.find(
        service => service.id === id
        );

      return service || null;
    }

    async addService(serviceData) {

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
        
        services.push(newService);

        const data = JSON.stringify(services, null, 2);
        await fs.writeFile(filePath, data);

        return newService;
    }

    async updateService(id, updatedData) {

        const services = await this.getServices();
        const service = services.find(
        service => service.id === id
        );

        if (!service) {
        return null;
        }

        const { id: ignoredId, ...safeData } = updatedData;

        Object.assign(service, safeData);

        const data = JSON.stringify(services, null, 2);
        await fs.writeFile(filePath, data);

        return service;
    }

    async deleteService(id) {
        
        const services = await this.getServices();
        const index = services.findIndex(
        service => service.id === id
        );

        if (index === -1) {
        return null;
        }

        const deletedServices = services.splice(index, 1);

        const data = JSON.stringify(services, null, 2);
        await fs.writeFile(filePath, data);

        return deletedServices[0];
  }
}

export default ServiceManager;

