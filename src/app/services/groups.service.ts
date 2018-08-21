import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
@Injectable({
  providedIn: "root"
})
export class GroupsService {
  private BASE_URL = "http://localhost:5000/api";
  private GET_GROUP_URL = "/Group/GetAllAsync";
  constructor(private http: Http) {}

  private getheader() {
    const header = new Headers();
    header.append("Accept", "application/json");
    header.append("Content-Type", "application/json");
    return header;
  }

  GetAllAsync() {
    return this.http.get(this.BASE_URL + this.GET_GROUP_URL, {
      headers: this.getheader()
    });
  }
}
