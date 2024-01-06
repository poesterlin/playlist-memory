import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createPDF } from './pdf';

const app = new Hono()

app.post('/', async (c) => {
  const body = await c.req.json();

  const { tracks, flipX, flipY } = body;
  
  const start = Date.now();
  const blob = await createPDF(tracks, flipX, flipY);
  console.log(`PDF created in ${Date.now() - start}ms`);

  return new Response(blob, { headers: { 'Content-Type': 'application/pdf' } });
});

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
