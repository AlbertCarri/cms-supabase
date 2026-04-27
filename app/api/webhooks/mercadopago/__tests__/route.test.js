// app/api/webhooks/mercadopago/__tests__/route.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST } from '../route';

// Mock de Supabase
vi.mock('../../../lib/supabase/service_role', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      upsert: vi.fn(() => Promise.resolve({ error: null })),
    })),
  })),
}));

describe('/api/webhooks/mercadopago', () => {
  beforeEach(() => {
    // Configurar variables de entorno para tests
    process.env.MP_SECRET_KEY = 'test-secret-key';
  });

  it('debe rechazar webhook sin firma válida', async () => {
    const request = new Request('http://localhost', {
      method: 'POST',
      headers: { 
        'x-signature': 'invalid',
        'x-request-id': '12345'
      },
      body: JSON.stringify({ data: { id: '123' } }),
    });
    
    const response = await POST(request);
    expect(response.status).toBe(401); // 401 porque firma inválida
  });

  it('debe rechazar webhook sin headers requeridos', async () => {
    const request = new Request('http://localhost', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({}),
    });
    
    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});