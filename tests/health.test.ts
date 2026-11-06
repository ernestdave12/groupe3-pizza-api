import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/infrastructure/http/app';

describe('GET /health', () => {
  it("répond 200 avec le statut de l'API", async () => {
    const res = await request(createApp()).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /docs.json', () => {
  it('expose le contrat OpenAPI', async () => {
    const res = await request(createApp()).get('/docs.json');

    expect(res.status).toBe(200);
    expect(res.body.openapi).toMatch(/^3\./);
  });
});
