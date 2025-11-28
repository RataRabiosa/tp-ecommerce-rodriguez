// Use ES Module syntax for imports
import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Get the directory name of the current module file (src/api)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Go up one level to the root directory and specify the db.json file
// The path will resolve to: [PROJECT_ROOT]/db.json
const dbPath = path.join(__dirname, '..', '..', 'db.json'); 


// --- Server Setup ---
const server = jsonServer.create();
// Pass the absolute path to the router
const router = jsonServer.router(dbPath); 
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Optional: Rewriter to handle /api/ prefix if needed
server.use(jsonServer.rewriter({
  '/api/*': '/$1' 
}));

server.use(router);

// Export the server instance (required by Vercel serverless function)
export default server;
