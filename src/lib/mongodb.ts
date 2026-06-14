import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  // During build time, Next.js may try to compile API routes without environment variables.
  // We should not throw an error immediately here unless it's runtime, to let builds succeed.
  console.warn('Warning: MONGODB_URI environment variable is not defined.');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri || 'mongodb://localhost:27017/tryusbd');
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri || 'mongodb://localhost:27017/tryusbd');
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
export async function getDb() {
  const conn = await clientPromise;
  // Parse DB name from connection URI or default to tryusbd
  const dbName = uri ? new URL(uri).pathname.substring(1).split('?')[0] : 'tryusbd';
  return conn.db(dbName || 'tryusbd');
}
