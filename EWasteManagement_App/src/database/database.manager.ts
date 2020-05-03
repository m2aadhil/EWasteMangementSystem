import { MongoClient } from 'mongodb';
import { enviorenment } from '../config';
var ObjectId = require('mongodb').ObjectID;

export class DBManager {
    private client: MongoClient;
    private db;

    constructor() {
        this.client = new MongoClient(enviorenment.Mongo.url, { useUnifiedTopology: true });
    }

    connect = async () => {
        try {
            // Connect to the MongoDB
            await this.client.connect();
            this.db = await this.client.db(enviorenment.Mongo.dbName);
        } catch (err) {
            console.error(err);
        }
        return await this.db;
    }

    closeConnection = async () => {
        try {
            this.client.close();
        } catch (err) {
            console.error(err);
        }
    }

    createIndex = async (collection: string, index: any) => {
        try {
            let coll = this.db.collection(collection);
            await coll.createIndex(index);
        } catch (err) {
            console.error(err);
        }
    }

    insertDocument = async (collection: string, document: any) => {
        try {
            await this.db.collection(collection).insertOne(document);
        } catch (err) {
            console.error(err);
        }
    }

    insertDocuments = async (collection: string, documents: any[]) => {
        try {
            await this.db.collection(collection).insertMany(documents);
        } catch (err) {
            console.error(err);
        }
    }

    updateDocument = async (collection: string, existingDoc: any, newDoc: any) => {
        try {
            let db = this.db
            await Promise.resolve(await db.collection(collection).updateOne(existingDoc, { $set: newDoc }));
        } catch (err) {
            console.error(err);
        }
        return await true;
    }

    getAllDocuments = async (collection: string) => {
        try {
            return await this.db.collection(collection).find({ IsActive: true }).toArray();
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    getDocuments = async (collection: string, document: any) => {
        try {
            document['IsActive'] = true;
            return await this.db.collection(collection).find(document).toArray();
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    getDocumentsById = async (collection: string, id: string) => {
        try {
            const o_id = new ObjectId(id);
            return await this.db.collection(collection).find({ '_id': o_id }).toArray();
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    updateDocumentsById = async (collection: string, id: string, newDoc: any) => {
        try {
            const o_id = new ObjectId(id);
            await this.db.collection(collection).updateOne({ '_id': o_id }, { $set: newDoc });

        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }

    getDocumentsFiltered = async (collection: string, document: any, fields: any) => {
        try {
            document['IsActive'] = true;
            return await this.db.collection(collection).find(document).project(fields).toArray();
        } catch (err) {
            console.error(err);
        }
        return null;
    }

}