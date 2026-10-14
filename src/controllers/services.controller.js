import { ServicesService } from "../services/services.service.js";

const service = new ServicesService();

export const getServices = async (req, res) => {
const category = req.query.category;  
    const available = req.query.available;  
    let services = await service.getServices();

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
    const foundService = await service.getServiceById(id);

    if (!foundService) {
       return res.status(404).json({
        "error": "Servicio no encontrado"
    })}
    res.status(200).json(foundService);
};

export const createService = async (req, res) => { 
    const serviceData = req.body;
    
   try {
    const newService = await service.createService(serviceData);

    res.status(201).json(newService);

    }catch (error) {
    return res.status(400).json({
        error: error.message
    })}
};

export const updateService = async (req, res) => {
    
    try {
        const id = Number(req.params.sid);
        const updateData = req.body;
        const updatedService = await service.updateService(id, updateData);

        if (!updatedService) {
            return res.status(404).json({
                error: "Servicio no encontrado"
            })
        }
        res.status(200).json(updatedService);  

    }catch (error) {
        res.status(400).json({
            error: error.message
        });
    }  
};

export const deleteService = async (req, res) => {
    const id = Number(req.params.sid);
    const deletedService = await service.deleteService(id);

    if (!deletedService) {
    return res.status(404).json({
        error: "Servicio no encontrado"
    })}

    res.status(200).json(deletedService);
};