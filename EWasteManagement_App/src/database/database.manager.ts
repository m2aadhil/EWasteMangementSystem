import { MongoClient } from 'mongodb';

export class DBManager {

    readonly databaseUri: string = "mongodb://team_minecraft:Admin123@ds046667.mlab.com:46667/land_evaluation";
    private client: MongoClient;
    private db;


    constructor() {
        this.client = new MongoClient(this.databaseUri, { useUnifiedTopology: true });
    }

    connect = async (dbName: string) => {
        try {
            // Connect to the MongoDB
            await this.client.connect();
            this.db = await this.client.db(dbName);
            console.log(this.db);
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
            return await this.db.collection(collection).find().toArray();
        } catch (err) {
            console.error(err);
        }
        return null;
    }

    getDocuments = async (collection: string, document: any) => {
        try {
            return await this.db.collection(collection).find(document).toArray();
        } catch (err) {
            console.error(err);
        }
        return null;
    }

}