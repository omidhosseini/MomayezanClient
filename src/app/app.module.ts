import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { GroupsComponent } from "./components/groups/groups.component";
import { GroupsService } from "./services/groups.service";
import { HttpModule } from "@angular/http";

const routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: AppComponent
  },
  {
    path: "home/groups",
    component: GroupsComponent
  }
];
@NgModule({
  declarations: [AppComponent, GroupsComponent],
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes)],
  providers: [GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
