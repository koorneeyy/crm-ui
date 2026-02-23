import http from "../http-common";

class UAVDataService {
  getAll() {
    return http.get("/uavs");
  }

  get(id) {
    return http.get(`/uavs/${id}`);
  }

  create(data) {
    return http.post("/uavs", data);
  }

  update(id, data) {
    return http.put(`/uavs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/uavs/${id}`);
  }

  deleteAll() {
    return http.delete(`/uavs`);
  }

  findByTitle(title) {
    return http.get(`/uavs?title=${title}`);
  }
}

export default new UAVDataService();