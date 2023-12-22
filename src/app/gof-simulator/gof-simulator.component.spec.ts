import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GofSimulatorComponent } from './gof-simulator.component';

describe('GofSimulatorComponent', () => {
  let component: GofSimulatorComponent;
  let fixture: ComponentFixture<GofSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GofSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GofSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
