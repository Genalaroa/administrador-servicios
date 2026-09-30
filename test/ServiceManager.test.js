import test from "node:test";
import assert from "node:assert";
import ServiceManager from "../src/managers/ServiceManager.js";



test("getServices devuelve un array", async () => {
    const manager = new ServiceManager();

    const services = await manager.getServices();

    assert.ok(Array.isArray(services));
});

test("getServiceById devuelve un servicio existente", async () => {
    const manager = new ServiceManager();

    const service = await manager.getServiceById(1);

    assert.ok(service);
    assert.strictEqual(service.id, 1);
});

test("getServiceById devuelve null si el servicio no existe", async () => {
    const manager = new ServiceManager();

    const service = await manager.getServiceById(999999);

    assert.strictEqual(service, null);
});