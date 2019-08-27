import {Component, OnInit} from '@angular/core';
import {User} from '../../user-management/models/user.model';
import {UserService} from '../../user-management/services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BugService} from '../services/bug.service';
import {Bug} from '../model/bug.model';
import {BugCreateValidator} from './bug-create.validator';
import {Attachment} from '../model/attachment.model';
import {BugAttachmentWrapper} from '../model/BugAttachmentWrapper';
import {StorageService} from "../../user-management/login/services/storage.service";

@Component({
  selector: 'app-bug-create',
  templateUrl: './bug-create.component.html',
  styleUrls: ['./bug-create.component.scss']
})
export class BugCreateComponent implements OnInit {
  private todayDate;
  private listOfUsersToAssign: User[];
  private bugCreateForm: FormGroup;

  constructor(private userService: UserService, private bugService: BugService, private formBuilder: FormBuilder,
              private storageService: StorageService) {
  }

  /**
   * When this component is initialized,
   * this function is called.
   * It builds the reactive form and sets the the Validators.
   */
  ngOnInit() {
    this.bugCreateForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
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
    // This call sets the 'CREATED_ID' field of the form, to the username of the current User from the current Session.
    this.bugCreateForm.get('CREATED_ID').setValue(this.storageService.getUserWithoutPermissionsFromSessionStorage().username);
    this.bugCreateForm.get('fixedVersion').setValue('');

    // This server call populates the drop-down list of 'ASSIGNED_ID' with the users inside the database.
    this.userService.getAllUsers().subscribe(users => {
      this.listOfUsersToAssign = users;
    });

    /* We initialize this attribute of the component with a new Date() because, whenever this component is initialized,
       We want to have the current date that is today inside the input type date.
       The reason is, we can not create new Bugs, and set the targetDate before today. */
    this.todayDate = new Date();
  }

  /**
   * This function builds a Wrapper object and sends it to the {@link BugService} to be
   * posted by the server.
   */
  onSubmit() {
    const bug = this.createBugEntity();
    const attachment = this.createAttachmentEntity(bug);
    const wrapper = this.createWrapperEntity(bug, attachment);
    this.bugService.submitBug(wrapper);
  }

  /**
   * We set the created_ID attribute to null, because we do not know the details of the current user.
   * We will find them out through the token.
   */
  createBugEntity(): Bug {
    const bugToCreate: Bug = {
      ID: 0,
      title: this.bugCreateForm.get('title').value.toString(),
      description: this.bugCreateForm.get('description').value.toString(),
      version: this.bugCreateForm.get('version').value.toString(),
      targetDate: this.bugCreateForm.get('targetDate').value.toString(),
      status: this.bugCreateForm.get('status').value.toString(),
      fixedVersion: this.bugCreateForm.get('fixedVersion').value.toString(),
      severity: this.bugCreateForm.get('severity').value.toString(),
      ASSIGNED_ID: this.bugCreateForm.get('ASSIGNED_ID').value,
      CREATED_ID: null,
    };
    return bugToCreate;

  }

  createAttachmentEntity(bug: Bug): Attachment {
    let attachmentToCreate: Attachment = {
      ID: 0,
      attContent: this.bugCreateForm.get('attachment').value,
      bugID: bug
    };
    return attachmentToCreate
  }

  createWrapperEntity(bug: Bug, attachment: Attachment): BugAttachmentWrapper {
    const wrapper: BugAttachmentWrapper = {
      bug: bug,
      attachment: attachment,
      token: this.storageService.getToken(),
    };
    return wrapper;
  }
}
