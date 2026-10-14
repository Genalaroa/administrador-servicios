import { promises as fs } from "fs";

const filePath = new URL("../data/bookings.json", import.meta.url);

export class BookingsDAO {

    async create(booking) {

        const fileData = await fs.readFile(filePath, "utf-8");
        const bookings = JSON.parse(fileData);  
                
        bookings.push(booking);

        const data = JSON.stringify(bookings, null, 2);
        await fs.writeFile(filePath, data);

        return booking
    }

    async getAll() {

        const data = await fs.readFile(filePath, "utf-8");
        const bookings= JSON.parse(data);
        
        return bookings;
    }

    async getById(id) {

        const bookings = await this.getAll();

        const booking = bookings.find(
            booking => booking.id === id
        );

        return booking || null;
    }


    async update(id, updatedBooking) {
        const bookings= await this.getAll();

        const index = bookings.findIndex(
            booking=> booking.id === id
        );

        if (index === -1) {
            return null;
        }

        bookings[index] = updatedBooking;

        const data = JSON.stringify(bookings, null, 2);
        await fs.writeFile(filePath, data);

        return updatedBooking;
    }





}

