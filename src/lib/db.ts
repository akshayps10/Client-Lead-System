import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';

// This is a Hybrid Driver: Try MongoDB -> Fallback to Local JSON
const DB_NAME = 'client-lead-system';
const COLLECTION_NAME = 'Lead';
const LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'leads.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}
if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify([]));
}

let client: MongoClient | null = null;
let isConnected = false;

async function getClient() {
    if (client && isConnected) return client;

    const uri = process.env.DATABASE_URL || process.env.MONGODB_URI;
    if (!uri) {
        console.warn('No DATABASE_URL or MONGODB_URI found, using local fallback');
        return null;
    }

    try {
        client = new MongoClient(uri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
        });
        await client.connect();
        isConnected = true;
        console.log('Successfully connected to MongoDB Atlas');
        return client;
    } catch (e) {
        console.error('MongoDB Atlas Connection Failed:', e);
        isConnected = false;
        return null;
    }
}

export async function getLeads() {
    const mongo = await getClient();
    if (mongo) {
        const db = mongo.db(DB_NAME);
        const leads = await db.collection(COLLECTION_NAME).find({}).sort({ createdAt: -1 }).toArray();
        return leads.map(l => ({
            ...l,
            id: l._id.toString(),
            saleDate: l.saleDate || l.createdAt
        }));
    }
    // Fallback
    if (!fs.existsSync(LOCAL_DB_PATH)) {
        return [];
    }
    try {
        const data = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf-8'));
        return data
            .map((l: any) => ({ ...l, saleDate: l.saleDate || l.createdAt }))
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (e) {
        console.error('Error reading local fallback:', e);
        return [];
    }
}

export async function createLead(leadData: any) {
    const mongo = await getClient();
    const newLead = {
        ...leadData,
        saleDate: leadData.saleDate || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (mongo) {
        const db = mongo.db(DB_NAME);
        const result = await db.collection(COLLECTION_NAME).insertOne({
            ...newLead,
            saleDate: new Date(newLead.saleDate),
            createdAt: new Date(newLead.createdAt),
            updatedAt: new Date(newLead.updatedAt),
            amount: parseFloat(leadData.amount)
        });
        return { ...newLead, id: result.insertedId.toString() };
    }

    // Fallback
    const data = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf-8'));
    const id = Math.random().toString(36).substr(2, 9);
    const leadWithId = { ...newLead, id };
    data.push(leadWithId);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2));
    return leadWithId;
}

export async function updateLead(id: string, leadData: any) {
    const mongo = await getClient();
    if (mongo) {
        const db = mongo.db(DB_NAME);
        const updateData = {
            ...leadData,
            saleDate: leadData.saleDate ? new Date(leadData.saleDate) : undefined,
            updatedAt: new Date()
        };

        // Ensure we only use ObjectId if the id is valid 24-char hex
        const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id: id };

        const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
            filter,
            { $set: updateData },
            { returnDocument: 'after' }
        );
        return result ? { ...result, id: result._id.toString() } : null;
    }

    // Fallback
    const data = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf-8'));
    const index = data.findIndex((l: any) => l.id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...leadData, updatedAt: new Date().toISOString() };
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2));
    return data[index];
}

export async function deleteLead(id: string) {
    const mongo = await getClient();
    if (mongo) {
        const db = mongo.db(DB_NAME);
        const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id: id };
        await db.collection(COLLECTION_NAME).deleteOne(filter);
        return true;
    }

    // Fallback
    const data = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf-8'));
    const filtered = data.filter((l: any) => l.id !== id);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(filtered, null, 2));
    return true;
}
