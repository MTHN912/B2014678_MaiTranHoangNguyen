"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const add_user_1 = require("./operations/add_user");
const execute_operation_1 = require("./operations/execute_operation");
const list_databases_1 = require("./operations/list_databases");
const remove_user_1 = require("./operations/remove_user");
const run_command_1 = require("./operations/run_command");
const validate_collection_1 = require("./operations/validate_collection");
/**
 * The **Admin** class is an internal class that allows convenient access to
 * the admin functionality and commands for MongoDB.
 *
 * **ADMIN Cannot directly be instantiated**
 * @public
 *
 * @example
 * ```ts
 * import { MongoClient } from 'mongodb';
 *
 * const client = new MongoClient('mongodb://localhost:27017');
 * const admin = client.db().admin();
 * const dbInfo = await admin.listDatabases();
 * for (const db of dbInfo.databases) {
 *   console.log(db.name);
 * }
 * ```
 */
class Admin {
    /**
     * Create a new Admin instance
     * @internal
     */
    constructor(db) {
        this.s = { db };
    }
    /**
     * Execute a command
     *
     * @param command - The command to execute
     * @param options - Optional settings for the command
     */
    async command(command, options) {
        return (0, execute_operation_1.executeOperation)(this.s.db.s.client, new run_command_1.RunCommandOperation(this.s.db, command, { dbName: 'admin', ...options }));
    }
    /**
     * Retrieve the server build information
     *
     * @param options - Optional settings for the command
     */
    async buildInfo(options) {
        return this.command({ buildinfo: 1 }, options);
    }
    /**
     * Retrieve the server build information
     *
     * @param options - Optional settings for the command
     */
    async serverInfo(options) {
        return this.command({ buildinfo: 1 }, options);
    }
    /**
     * Retrieve this db's server status.
     *
     * @param options - Optional settings for the command
     */
    async serverStatus(options) {
        return this.command({ serverStatus: 1 }, options);
    }
    /**
     * Ping the MongoDB server and retrieve results
     *
     * @param options - Optional settings for the command
     */
    async ping(options) {
        return this.command({ ping: 1 }, options);
    }
    /**
     * Add a user to the database
     *
     * @param username - The username for the new user
     * @param passwordOrOptions - An optional password for the new user, or the options for the command
     * @param options - Optional settings for the command
     * @deprecated Use the createUser command in `db.command()` instead.
     * @see https://www.mongodb.com/docs/manual/reference/command/createUser/
     */
    async addUser(username, passwordOrOptions, options) {
        options =
            options != null && typeof options === 'object'
                ? options
                : passwordOrOptions != null && typeof passwordOrOptions === 'object'
                    ? passwordOrOptions
                    : undefined;
        const password = typeof passwordOrOptions === 'string' ? passwordOrOptions : undefined;
        return (0, execute_operation_1.executeOperation)(this.s.db.s.client, new add_user_1.AddUserOperation(this.s.db, username, password, { dbName: 'admin', ...options }));
    }
    /**
     * Remove a user from a database
     *
     * @param username - The username to remove
     * @param options - Optional settings for the command
     */
    async removeUser(username, options) {
        return (0, execute_operation_1.executeOperation)(this.s.db.s.client, new remove_user_1.RemoveUserOperation(this.s.db, username, { dbName: 'admin', ...options }));
    }
    /**
     * Validate an existing collection
     *
     * @param collectionName - The name of the collection to validate.
     * @param options - Optional settings for the command
     */
    async validateCollection(collectionName, options = {}) {
        return (0, execute_operation_1.executeOperation)(this.s.db.s.client, new validate_collection_1.ValidateCollectionOperation(this, collectionName, options));
    }
    /**
     * List the available databases
     *
     * @param options - Optional settings for the command
     */
    async listDatabases(options) {
        return (0, execute_operation_1.executeOperation)(this.s.db.s.client, new list_databases_1.ListDatabasesOperation(this.s.db, options));
    }
    /**
     * Get ReplicaSet status
     *
     * @param options - Optional settings for the command
     */
    async replSetGetStatus(options) {
        return this.command({ replSetGetStatus: 1 }, options);
    }
}
exports.Admin = Admin;
//# sourceMappingURL=admin.js.map