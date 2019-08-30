import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GetBugIdComponent} from './get-bug-id.component';

describe('GetBugIdComponent', () => {
  let component: GetBugIdComponent;
  let fixture: ComponentFixture<GetBugIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GetBugIdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBugIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
