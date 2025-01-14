import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.currentPage = 1;
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('totalItems', 20);
    fixture.detectChanges();
  });

  it('should create the paginator component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the correct totalPages', () => {
    const expectedTotalPages = Math.ceil(
      component.totalItems() / component.pageSize(),
    );
    expect(component.totalPages).toBe(expectedTotalPages);
  });

  it('should emit pageChange when the page changes', () => {
    spyOn(component.pageChange, 'emit');

    component.onPageChange(2);

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
    expect(component.currentPage).toBe(2); // Check to see that the current page was updated
  });
});
