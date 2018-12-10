import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroupsService } from "../../services/groups.service";
import { GroupsDto } from "../../models/groups/groups.model";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  SUCCESS_MESSAGE: string = "عملیات با موفقیت انجام شد";
  ERROR_MESSAGE: string = "";
  model: any;
  registerForm: FormGroup;
  lastIndex: number = 0;
  isEditing: boolean = false;

  constructor(
    private grpService: GroupsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    console.log("Groups");
  }

  async ngOnInit() {
    this.registerForm = this.fb.group({
      code: new FormBuilder().control("", Validators.required),
      title: new FormBuilder().control("", Validators.required)
    });
    await this.GetList();
  }

  async ngAfterViewInit() {
    await this.GetList();
    this.dtTrigger.next();
  }

  submitGroup(): void {
    let me = this;
    this.grpService
      .InsertGroup(this.registerForm.value)
      .toPromise()
      .then(res => {
        me.showSuccess(me.SUCCESS_MESSAGE);
        me.model = null;
        me.rerender();
      })
      .catch(this.handleError);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  async rerender() {
    let me = this;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    await me.GetList();
    this.dtTrigger.next();
  }

  async GetList() {
    var me = this;
    me.model = null;
    let res = await this.grpService.GetAllAsync().toPromise();
    me.model = res;
  }

  initEdit(index) {
    console.log(index);
    this.lastIndex = index;
  }

  onEditing(index) {
    this.isEditing = !this.isEditing;
    return this.lastIndex == index;
  }

  updateCode(itm, codeValue) {
    console.log("Code", itm);
    let me = this;
    let grp: GroupsDto = new GroupsDto();
    grp.id = itm.id;
    grp.code = codeValue;
    grp.title = itm.title;
    this.grpService
      .UpdateGroup(grp)
      .toPromise()
      .then(x => {
        me.model = null;
        me.showSuccess(me.SUCCESS_MESSAGE);
        me.rerender();
      })
      .catch(x => {
        this.handleError;
        let err = JSON.parse(x._body);
        this.showError(err);
      });
  }
  updateTitle(itm, titleValue) {
    let me = this;
    console.log("title", itm);
    let grp: GroupsDto = new GroupsDto();
    grp.id = itm.id;
    grp.code = itm.code;
    grp.title = titleValue;
    this.grpService
      .UpdateGroup(grp)
      .toPromise()
      .then(x => {
        me.model = null;
        me.showSuccess(me.SUCCESS_MESSAGE);
        me.rerender();
      })
      .catch(x => {
        this.handleError;
        let err = JSON.parse(x._body);
        this.showError(err);
      });
  }
  indexTracker(index: number, value: any) {
    console.log(index, value);
    return index;
  }
  showSuccess(msg) {
    this.toastr.success(msg, "پیام سیستم");
  }
  showError(msg) {
    this.toastr.error(msg.errors[0].message, "پیام سیستم");
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
