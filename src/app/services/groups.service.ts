import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { GroupsDto } from "../models/groups/groups.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GroupsService {
  private BASE_URL = "http://localhost:5000/api";
  private GET_GROUP_URL = "/Group/GetAllAsync";
  private POST_GROUP_URL = "/Group/Add";
  private PUT_GROUP_URL = "/Group/Edit";
  constructor(private http: HttpClient) {}

  private getheader() {
    const header = new HttpHeaders();
    header.append("Accept", "application/json");
    header.append("Content-Type", "application/json");
    return header;
  }

  GetAllAsync() {
    return this.http.get(this.BASE_URL + this.GET_GROUP_URL, {
      headers: this.getheader()
    });
  }
  InsertGroup(group: GroupsDto) {
    let body = JSON.stringify(group);
    return this.http.post(this.BASE_URL + this.POST_GROUP_URL, body, {
      headers: this.getheader()
    });
  }
  UpdateGroup(group: GroupsDto) {
    let body = JSON.stringify(group);
    return this.http.put(this.BASE_URL + this.PUT_GROUP_URL, body, {
      headers: this.getheader()
    });
  }
  logHeader(header) {
    console.log(header);
  }
}
