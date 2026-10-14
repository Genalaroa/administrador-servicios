import {BookingsService} from "../services/bookings.service.js";

const bookingsService = new BookingsService();

export const createBooking = async (req, res) => { 

    const bookingData = req.body; 

    try {   
    const newBooking = await bookingsService.createBooking(bookingData);   
           res.status(201).json(newBooking);   
    } catch (error) {   
        return res.status(400).json({   
            error: error.message
        });
    }
};

 export const getBookingById = async (req, res) => {

    const id = Number(req.params.bid);
    const booking = await bookingsService.getBookingById(id);

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
    
    const updatedBooking = await bookingsService.addServiceToBooking(bookingId, serviceId);

    if (!updatedBooking) {
    return res.status(404).json({
        "error": "Reserva o servicio no encontrado"
    });
    }
    res.status(200).json(updatedBooking);

 };