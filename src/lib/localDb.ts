import fs from 'fs';
import path from 'path';

const localDbPath = path.join(process.cwd(), 'src/data/local_db.json');

export interface LocalDb {
  orders: any[];
  contact_messages: any[];
}

export function readLocalDb(): LocalDb {
  try {
    const dir = path.dirname(localDbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(localDbPath)) {
      const data = fs.readFileSync(localDbPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading local fallback database:', error);
  }
  return { orders: [], contact_messages: [] };
}

export function writeLocalDb(data: LocalDb) {
  try {
    const dir = path.dirname(localDbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing local fallback database:', error);
  }
}
