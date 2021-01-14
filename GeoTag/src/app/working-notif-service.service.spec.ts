import { TestBed } from '@angular/core/testing';

import { WorkingNotifServiceService } from './working-notif-service.service';

describe('WorkingNotifServiceService', () => {
  let service: WorkingNotifServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingNotifServiceService);
  });

  /* 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  */
});
