import ServiceManager from "../managers/ServiceManager.js";

const manager = new ServiceManager();

export const getServices = async (req, res) => {
const category = req.query.category;  
    const available = req.query.available;  
    let services = await manager.getServices();

    if (category) {
    services = services.filter((service) => {
     return service.category.toLowerCase() === category.toLowerCase();
    })}
    
    if (available !== undefined) {
     const availableBoolean = available === "true";
     services = services.filter((service) => {
     return service.available === availableBoolean;
    })}

    res.status(200).json(services);
};

export const getServiceById = async (req, res) => {   
 const id = Number(req.params.sid);
    const service = await manager.getServiceById(id);

    if (!service) {
       return res.status(404).json({
        "error": "Servicio no encontrado"
    })}
    res.status(200).json(service);
};

export const createService = async (req, res) => { 
    const serviceData = req.body;
    
   try {
    const newService = await manager.addService(serviceData);

    res.status(201).json(newService);

    }catch (error) {
    return res.status(400).json({
        error: error.message
    })}
};

export const updateService = async (req, res) => {
    const id = Number(req.params.sid);
    const updateData = req.body;
    const updatedService = await manager.updateService(id, updateData);

    if (!updatedService){
    return res.status(404).json({
        error: "Servicio no encontrado"
    })}

    res.status(200).json(updatedService);  
};

export const deleteService = async (req, res) => {
    const id = Number(req.params.sid);
    const deletedService = await manager.deleteService(id);

    if (!deletedService) {
    return res.status(404).json({
        error: "Servicio no encontrado"
    })}

    res.status(200).json(deletedService);
};