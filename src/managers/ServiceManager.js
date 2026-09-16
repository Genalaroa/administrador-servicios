import servicesData from "../data/services.json" with { type: "json" };


class ServiceManager {
   constructor() {
    this.services = structuredClone(servicesData);
   }

   getServices() {
    return this.services;
   }

    getServiceById(id) {
    const service = this.services.find(
        service => service.id === id
    );
    return service || null;
    }

    addService(serviceData) {
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
    );
    }

    const ids = this.services.map(service => service.id);

    const newId = ids.length > 0
        ? Math.max(...ids) + 1
        : 1;

    const newService = {
    ...serviceData,
        id: newId
    };
    
    this.services.push(newService);

    return newService;
    }

    updateService(id, updatedData) {
     const service = this.services.find(
        service => service.id === id
     );
     if (!service) {
      return null;
    }
    const { id: ignoredId, ...safeData } = updatedData;

    Object.assign(service, safeData);

    return service;
    }

    deleteService(id) {
    const index = this.services.findIndex(
    service => service.id === id
    );
    if (index === -1) {
    return null;
    }

    const deletedServices = this.services.splice(index, 1);

    return deletedServices[0];
  }

}

export default ServiceManager;

