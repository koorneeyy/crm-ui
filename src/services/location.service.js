import http from "../http-common";

class LocationDataService {
  getAll() {
    return http.get("/locations");
  }
}

export default new LocationDataService();