import { promises as fs } from "node:fs";

const filePath = new URL("../data/services.json", import.meta.url);

export class ServicesDAO {

    async getAll()  {
        
        const data = await fs.readFile(filePath, "utf-8");
        const services = JSON.parse(data);
        
        return services;
    }

    async getById(id) {

        const services = await this.getAll();
        const service = services.find(
            service => service.id === id
            );

        return service || null;
    }
    

    async create(service) {
            
        const services = await this.getAll();

        services.push(service);

        const data = JSON.stringify(services, null, 2);
        await fs.writeFile(filePath, data);

        return service;
    }

    async update(id, updatedService) {
        const services = await this.getAll();

        const index = services.findIndex(
            service => service.id === id
        );

        if (index === -1) {
            return null;
        }

        services[index] = updatedService;

        const data = JSON.stringify(services, null, 2);
        await fs.writeFile(filePath, data);

        return updatedService;
    }

    async delete(id) {

       const services = await this.getAll();

        const index = services.findIndex(
            service => service.id === id
        );

        if (index === -1) {
         return null;
       }
        
       const deleted = services.splice(index, 1);

       const data = JSON.stringify(services, null, 2);
       await fs.writeFile(filePath, data);

       return deleted[0];
    }

}