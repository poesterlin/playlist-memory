import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createPDF } from './pdf';

const app = new Hono()

app.post('/', async (c) => {
  const body = await c.req.json();



  const { tracks, flipX, flipY } = body;


  const blob = await createPDF(tracks, flipX, flipY);
  return new Response(blob, { headers: { 'Content-Type': 'application/pdf' } });
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
