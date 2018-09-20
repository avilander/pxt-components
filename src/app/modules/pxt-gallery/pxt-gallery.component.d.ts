import { OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
export declare class PxtGalleryComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    width: any;
    height: any;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
