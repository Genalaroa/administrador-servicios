import { ServicesDAO } from "../dao/services.dao.js";

const dao = new ServicesDAO ();

export class ServicesRepository {

    async getAll() {
        return await dao.getAll();
    }

    async getById(id) {
        return await dao.getById(id);
    }

    async create(service) {
        return await dao.create(service);
    }

    async update(id, updatedService) {
        return await dao.update(id, updatedService);
    }

    async delete(id) {
        return await dao.delete(id);
    }
}