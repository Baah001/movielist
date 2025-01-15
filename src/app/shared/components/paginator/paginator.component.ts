import { Component, Input, input, output } from '@angular/core';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';

/**
 * A reusable paginator component that uses NgZorro's pagination feature.
 */
@Component({
  selector: 'app-paginator',
  imports: [NzPaginationComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  standalone: true,
})
export class PaginatorComponent {
  /**
   * The current page of the paginator, defaulting to 1.
   */
  @Input() currentPage: number = 1;

  /**
   * The number of items displayed per page (required input).
   */
  pageSize = input.required<number>();

  /**
   * The total number of items (required input).
   */
  totalItems = input.required<number>();

  /**
   * Event emitted when the page changes, sending the new page number.
   */
  pageChange = output<number>();

  /**
   * Handles the page change event triggered by the pagination component.
   * Updates the current page and emits the new page number.
   *
   * @param newPage - The newly selected page number.
   */
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.pageChange.emit(newPage);
  }

  /**
   * Calculates the total number of pages based on the total items and page size.
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems() / this.pageSize());
  }
}
