import { Subject } from 'rxjs';

export class DataContainer<T> {
    data: T[];
    /**
     * Displayed items per page
     */
    page_size: number = 10;
    filter(callbackfn: (value: T, index: number, array: T[]) => value is T, thisArg?: any): Pager<T> {
        return new Pager<T>(this.data.filter(callbackfn), this.page_size);
    }
    constructor() { }
}

export class Pager<T> {
    constructor(
        public data: T[],
        public page_size: number
    ) { }
    /**
     * Store current page as state
     */
    current_page: number = 1;
    /**
     * Display data Observer
     */
    display: Subject<T[]> = new Subject();
    /**
     * Step ahead
     */
    next() { if (this.current_page < this.max_page_number()) { this.current_page++; this.send(); } }
    /**
     * Step back
     */
    back() { if (this.current_page > 1) { this.current_page--; this.send(); } }
    /**
     * Navigate to page directly
     */
    navigate_to(page: number) { if (page > 0 && page < this.max_page_number()) { this.current_page = page; this.send(); } }
    /**
     * Determine the max page number
     * e.g.: 11 data length, 5 item / page
     * => Ceil(11/5) => 2.2 => 3
     */
    max_page_number(): number {
        return Math.ceil(this.data.length / this.page_size);
    }
    /**
     * Manual pagination
     */
    pagination(array: T[], page_size: number, page_number: number): T[] {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    /**
     * Send paginated data to the subscribers
     */
    private send() {
        this.display.next(
            this.pagination(this.data, this.page_size, this.current_page)
        )
    }
}