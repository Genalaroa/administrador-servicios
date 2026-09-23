import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";

const router = Router();
const manager = new ServiceManager();


router.get("/:sid", (req, res) => { 
    const id = Number(req.params.sid);
    const service = manager.getServiceById(id);

    if (!service) {
       return res.status(404).json({
        "error": "Servicio no encontrado"
    })}
    res.status(200).json(service);
});

router.get("/", (req, res) => {

    const category = req.query.category;  
    const available = req.query.available;  
    let services = manager.getServices();

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
});

router.post("/", (req, res) => {
    
    const serviceData = req.body;
    
   try {
    const newService = manager.addService(serviceData);

    res.status(201).json(newService);

    }catch (error) {
    return res.status(400).json({
        error: error.message
    })}
});

router.put("/:sid", (req,res) => {
    
    const id = Number(req.params.sid);
    const updateData = req.body;
    const updatedService = manager.updateService(id, updateData);

    if (!updatedService){
    return res.status(404).json({
        error: "Servicio no encontrado"
    })}

    res.status(200).json(updatedService);    
});


router.delete("/:sid", (req, res) => {

    const id = Number(req.params.sid);
    const deletedService = manager.deleteService(id);

    if (!deletedService) {
    return res.status(404).json({
        error: "Servicio no encontrado"
    })}

    res.status(200).json(deletedService);
});


export default router;  