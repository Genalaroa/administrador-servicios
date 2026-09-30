import { Router } from "express";
import BookingManager from "../managers/BookingManager.js";

const router = Router();
const manager = new BookingManager();

router.post("/", async (req, res) => {

    const bookingData = req.body; 

    try {   
    const newBooking = await manager.createBooking(bookingData);   
           res.status(201).json(newBooking);   
    } catch (error) {   
        return res.status(400).json({   
            error: error.message
        });
    }
}); 

router.get("/:bid", async (req, res) => {

    const id = Number(req.params.bid);
    const booking = await manager.getBookingById(id);

    if (!booking) {
    return res.status(404).json({
        "error": "Reserva no encontrada"
    });
    }

    res.status(200).json(booking);
});

router.post("/:bid/services/:sid", async (req, res) => {

    const bookingId = Number(req.params.bid);
    const serviceId = Number(req.params.sid);
    const updatedBooking = await manager.addServiceToBooking(bookingId, serviceId);

    if (!updatedBooking) {
    return res.status(404).json({
        "error": "Reserva o servicio no encontrado"
    });
    }
    res.status(200).json(updatedBooking);
});

export default router;  