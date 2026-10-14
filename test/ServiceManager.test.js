import test from "node:test";
import assert from "node:assert";
import {ServicesService} from "../src/services/services.service.js";



test("getServices devuelve un array", async () => {
    const service = new ServicesService();

    const services = await service.getServices();

    assert.ok(Array.isArray(services));
});

test("getServiceById devuelve un servicio existente", async () => {
    const service = new ServicesService();

    const serviceId = await service.getServiceById(1);

    assert.ok(serviceId);
    assert.strictEqual(serviceId.id, 1);
});

test("getServiceById devuelve null si el servicio no existe", async () => {
    const service = new ServicesService();

    const serviceId = await service.getServiceById(999999);

    assert.strictEqual(serviceId, null);
});

test("getServices devuelve al menos un servicio", async () => {
    const service = new ServicesService();

    const services = await service.getServices();

    assert.ok(services.length>0);
});