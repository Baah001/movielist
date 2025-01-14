import { Component, Input, input, output } from '@angular/core';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-paginator',
  imports: [NzPaginationComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  standalone: true,
})
export class PaginatorComponent {
  @Input() currentPage: number = 1;
  pageSize = input.required<number>();
  totalItems = input.required<number>();
  pageChange = output<number>();

  /**
   * Handles page change events from the pagination component.
   * @param newPage - The newly selected page.
   */
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.pageChange.emit(newPage);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems() / this.pageSize());
  }
}
