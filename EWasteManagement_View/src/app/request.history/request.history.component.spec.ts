import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Request.HistoryComponent } from './request.history.component';

describe('Request.HistoryComponent', () => {
  let component: Request.HistoryComponent;
  let fixture: ComponentFixture<Request.HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Request.HistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Request.HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
