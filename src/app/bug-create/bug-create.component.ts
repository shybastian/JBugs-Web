import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../user-management/models/user.model';
import {UserService} from '../user-management/services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BugService} from '../bug-management/services/bug.service';
import {Bug} from '../bug-management/model/bug.model';
import {BugCreateValidator} from './bug-create.validator';
import {Attachment} from '../bug-management/model/attachment';
import {BugAttachmentWrapper} from '../bug-management/model/BugAttachmentWrapper';

@Component({
  selector: 'app-bug-create',
  templateUrl: './bug-create.component.html',
  styleUrls: ['./bug-create.component.scss']
})
export class BugCreateComponent implements OnInit {
  private reader = new FileReader();
  private todayDate = new Date();
  private listOfUsersToAssign: User[];
  private file: File;

  private attachmentData: string | ArrayBuffer = '';
  private fileName: any = '';

  private createdUser: User = {
    id: 3,
    firstName: 'test',
    lastName: 'test',
    username: 'testt',
    password: 'asdfghjkl',
    counter: 0,
    email: 'test',
    mobileNumber: 'test',
    status: 1,
    roles: undefined,
  };

  private assignedUser: User = {
    id: 4,
    firstName: 'sebi',
    lastName: 'sebi',
    username: 'sebis',
    password: 'sebisebi',
    counter: 0,
    email: 'sebi',
    mobileNumber: 'sebi',
    status: 1,
    roles: undefined,
  };

  private bugCreateForm: FormGroup;
  private bugToCreate: Bug = {
    ID: 0,
    title: '',
    description: '',
    version: '',
    targetDate: '',
    status: '',
    fixedVersion: '',
    severity: '',
    CREATED_ID: undefined,
    ASSIGNED_ID: undefined
  };

  private attachmentToCreate: Attachment = {
    ID: 0,
    attContent: undefined,
    bugID: undefined,
  };

  private wrapper: BugAttachmentWrapper = {
    bug: undefined,
    attachment: undefined,
  };

  constructor(private userService: UserService, private bugService: BugService, private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.bugCreateForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      version: new FormControl(null, [Validators.required, BugCreateValidator.validateVersion]),
      fixedVersion: new FormControl(null,),
      targetDate: new FormControl(null),
      severity: new FormControl(null, [Validators.required]),
      CREATED_ID: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      ASSIGNED_ID: new FormControl(null),
      attachment: new FormControl(null)
    });

    this.bugCreateForm.get('status').setValue('NEW');
    this.bugCreateForm.get('CREATED_ID').setValue(this.createdUser.username);
    this.bugCreateForm.get('fixedVersion').setValue('');
    this.bugCreateForm.get('ASSIGNED_ID').setValue(this.assignedUser.username);

    this.userService.getAllUsers().subscribe(users => {
      this.listOfUsersToAssign = users;
    });
  }

  // TODO : clean code down here.
  onSubmit() {

    // creating the BUG entity first
    this.bugToCreate.title = this.bugCreateForm.get('title').value.toString();
    // this.bugToCreate.description = this.bugCreateForm.get('description').value.toString();
    this.bugToCreate.description = 'a';
    this.bugToCreate.version = this.bugCreateForm.get('version').value.toString();
    this.bugToCreate.targetDate = this.bugCreateForm.get('targetDate').value.toString();
    this.bugToCreate.status = this.bugCreateForm.get('status').value.toString();
    this.bugToCreate.fixedVersion = this.bugCreateForm.get('fixedVersion').value.toString();
    this.bugToCreate.severity = this.bugCreateForm.get('severity').value.toString();
    // this.bugToCreate.CREATED_ID = this.bugCreateForm.get('CREATED_ID').value.toString();
    this.bugToCreate.CREATED_ID = this.createdUser;
    // this.bugToCreate.ASSIGNED_ID = this.bugCreateForm.get('ASSIGNED_ID').value.toString();
    this.bugToCreate.ASSIGNED_ID = this.assignedUser;

    // creating the ATTACHMENT entity here
    //this.attachmentToCreate.attContent = this.bugCreateForm.get('attachment').value;
    //this.attachmentToCreate.attContent = this.attachmentData;
    //this.attachmentToCreate.attContent = this.file;

    //console.log(this.bugCreateForm.get('attachment').value.toString());

    //this.attachmentToCreate.attContent = this.attachmentData;
    //this.attachmentToCreate.attContent = this.bugCreateForm.get('attachment').value.toString();
    //this.attachmentToCreate.attContent = this.attachmentData;
    this.attachmentToCreate.attContent = this.file;

    //console.log(this.attachmentToCreate.attContent.toString());

    this.attachmentToCreate.bugID = this.bugToCreate;

    // creating the wrapper to have both the BUG and the ATTACHMENT inside a json object.
    // this.wrapper.bug = this.bugToCreate;
    // this.wrapper.attachment = this.attachmentToCreate;

    this.bugService.submitBug(this.bugToCreate, this.attachmentToCreate, this.file);

  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {

      const uploadedFile = event.target.files[0];
      this.file = uploadedFile;

      console.log('THIS IS THE UPLOADED FILE', uploadedFile);

      // this.reader.onload = (e) => {
      //   this.attachmentData = this.reader.result;
      // };
      //this.reader.readAsText(files);
      //this.reader.readAsBinaryString(files);
      //this.reader.readAsDataURL(uploadedFile);
      //this.reader.readAsDataURL(files);
      //this.reader.readAsArrayBuffer(files);

      //this.bugCreateForm.patchValue(['uploadFile'], files);

      this.cd.markForCheck();
    }
  }
}
