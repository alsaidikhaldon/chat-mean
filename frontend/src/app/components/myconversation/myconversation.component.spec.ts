import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyconversationComponent } from './myconversation.component';

describe('MyconversationComponent', () => {
  let component: MyconversationComponent;
  let fixture: ComponentFixture<MyconversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyconversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyconversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
