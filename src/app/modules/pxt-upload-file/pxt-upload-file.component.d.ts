import { OnInit, EventEmitter } from '@angular/core';
export declare class PxtUploadFileComponent implements OnInit {
    placeholder: string;
    fileSelected: EventEmitter<any>;
    constructor();
    arrayImages: FileReader;
    ngOnInit(): void;
    onChangeImagem(event: any): void;
}
