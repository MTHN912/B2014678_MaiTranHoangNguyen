import createApiClient from "./api.service";

class AccountService {

    constructor(baseUrl = "/api/accounts") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    } 

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    } 

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async register(data) {
        return (await this.api.post("/register", data)).data;
    }

    async login(email,  username, password) {
        const data = {'email': email,  'username': username, 'password': password}
        return (await this.api.post("/login", data)).data;
    }

    async checkExitsAcc(email) {
        return (await this.api.get(`/search/${email}`)).data;
    }
} 
export default new AccountService();