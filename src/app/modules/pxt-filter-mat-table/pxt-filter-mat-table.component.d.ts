import { OnInit } from '@angular/core';
import { MatChipInputEvent, MatTableDataSource } from '@angular/material';
export declare class PxtFilterMatTableComponent implements OnInit {
    dataSource: MatTableDataSource<any>;
    placeholder: String;
    constructor();
    ngOnInit(): void;
    visible: boolean;
    selectable: boolean;
    removable: boolean;
    addOnBlur: boolean;
    readonly separatorKeysCodes: number[];
    filters: any[];
    add(event: MatChipInputEvent): void;
    applyFilter(filter: string): void;
    remove(fruit: any): void;
    configureFilterPredicate(): void;
}
