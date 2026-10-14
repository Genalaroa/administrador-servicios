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

test("createService rechaza un precio negativo", async () => {
    const service = new ServicesService();

    await assert.rejects(
        service.createService({
            name: "Prueba",
            description: "Servicio de prueba",
            duration: 30,
            price: -10,
            category: "Pruebas",
            available: true
        }),
        /El precio debe ser un número mayor que 0/
    );
});

test("createService rechaza una duración negativa", async () => {
    const service = new ServicesService();

    await assert.rejects(
        service.createService({
            name: "Prueba",
            description: "Servicio de prueba",
            duration: -30,
            price: 10,
            category: "Pruebas",
            available: true
        }),
        /La duración debe ser un número mayor que 0/
    );
});

test("updateService rechaza un precio negativo", async () => {
    const service = new ServicesService();

    await assert.rejects(
        service.updateService(1, { price: -10 }),
        /El precio debe ser un número mayor que 0/
    );
});