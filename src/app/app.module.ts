import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataTablesModule } from "angular-datatables";
import { AppComponent } from "./app.component";
import { GroupsComponent } from "./components/groups/groups.component";
import { GroupsService } from "./services/groups.service";
import { HttpClientModule } from "@angular/common/http";

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
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DataTablesModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
