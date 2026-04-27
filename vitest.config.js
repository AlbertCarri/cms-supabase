import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,  // Para usar describe/it sin importarlos en cada test
    environment: 'node',  // Para APIs como Request
  },
});