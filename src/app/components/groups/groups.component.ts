import { Component, OnInit } from "@angular/core";
import { GroupsService } from "../../services/groups.service";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit {
  model: {
    id: number;
    code: string;
    title: string;
  };
  constructor(private grpService: GroupsService) {
    console.log("Groups");
  }

  ngOnInit() {
    this.grpService.GetAllAsync().subscribe(res => {
      this.model = res.json();
      console.log(this.model);
    });
  }
}
