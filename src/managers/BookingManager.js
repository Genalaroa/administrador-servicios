import { promises as fs } from "fs";

const filePath = new URL("../data/bookings.json", import.meta.url);

class BookingManager { 

    async createBooking(bookingData) {

        const fileData = await fs.readFile(filePath, "utf-8");
        const bookings = JSON.parse(fileData);

        const requiredFields = [ 
            "clientName", 
            "clientEmail", 
            "date", 
            "time", 
            "status" 
        ];

        const missingFields = requiredFields.filter( 
            field => bookingData[field] === undefined || 
            bookingData[field] === null 
        ); 
 
        if (missingFields.length > 0) { 
            throw new Error( 
                `Faltan campos obligatorios: ${missingFields.join(", ")}`
            );
        }

        const ids = bookings.map(booking => booking.id);
        
        const newId = ids.length > 0
           ? Math.max(...ids) + 1
           : 1;

        const newBooking = {
            ...bookingData,
            id: newId,
            services: []
        };

        bookings.push(newBooking);

        const data = JSON.stringify(bookings, null, 2);
        await fs.writeFile(filePath, data);

        return newBooking;
    }

    async getBookingById(id) {

        const fileData = await fs.readFile(filePath, "utf-8");
        const bookings = JSON.parse(fileData);

        const booking = bookings.find(
            booking => booking.id === id
        );

        return booking || null;
    }

    async addServiceToBooking(bookingId, serviceId) {

        const fileData = await fs.readFile(filePath, "utf-8");
        const bookings = JSON.parse(fileData);
        
        const booking = bookings.find(
            booking => booking.id === bookingId
        );

        if (!booking) {
            return null;
        }

        const existingService = booking.services.find(
            item => item.service === serviceId
        );

        if (existingService) {
            existingService.quantity = existingService.quantity + 1;
        } else {
            booking.services.push({
                service: serviceId,
                quantity: 1
            });
        }

        const data = JSON.stringify(bookings, null, 2); 
        await fs.writeFile(filePath, data);

        return booking;
    }
}
 
export default BookingManager