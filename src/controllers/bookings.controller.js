import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const manager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = async (req, res) => { 

    const bookingData = req.body; 

    try {   
    const newBooking = await manager.createBooking(bookingData);   
           res.status(201).json(newBooking);   
    } catch (error) {   
        return res.status(400).json({   
            error: error.message
        });
    }
};

 export const getBookingById = async (req, res) => {

    const id = Number(req.params.bid);
    const booking = await manager.getBookingById(id);

    if (!booking) {
    return res.status(404).json({
        "error": "Reserva no encontrada"
    });
    }

    res.status(200).json(booking);
 };

 export const addServiceToBooking = async (req, res) => {

    const bookingId = Number(req.params.bid);
    const serviceId = Number(req.params.sid);
    const service = await serviceManager.getServiceById(serviceId);

    if (!service) {
       return res.status(404).json({
        "error": "Servicio no encontrado"
    })}
    
    const updatedBooking = await manager.addServiceToBooking(bookingId, serviceId);

    if (!updatedBooking) {
    return res.status(404).json({
        "error": "Reserva o servicio no encontrado"
    });
    }
    res.status(200).json(updatedBooking);

 };