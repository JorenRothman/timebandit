import path from 'path';
import { CONFIG_DIR } from '@/constants/paths';
import sqlite3 from 'sqlite3';

export const DB_NAME = 'database.sqlite3';
export const DB = new sqlite3.Database(path.resolve(CONFIG_DIR, DB_NAME));
