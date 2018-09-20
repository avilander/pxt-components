/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NgxGalleryAnimation } from 'ngx-gallery';
export class PxtGalleryComponent {
    constructor() {
        this.width = "100%";
        this.height = '400px';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.galleryOptions = [
            {
                width: this.width,
                height: this.height,
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: this.width,
                height: this.height,
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            {
                breakpoint: 400,
                preview: false
            }
        ];
    }
}
PxtGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-gallery',
                template: "<ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\n",
                styles: [".custom-position{z-index:0!important}"]
            }] }
];
/** @nocollapse */
PxtGalleryComponent.ctorParameters = () => [];
PxtGalleryComponent.propDecorators = {
    galleryImages: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PxtGalleryComponent.prototype.galleryOptions;
    /** @type {?} */
    PxtGalleryComponent.prototype.galleryImages;
    /** @type {?} */
    PxtGalleryComponent.prototype.width;
    /** @type {?} */
    PxtGalleryComponent.prototype.height;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFzQyxtQkFBbUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVF0RixNQUFNO0lBTUo7cUJBRnNCLE1BQU07c0JBQ0wsT0FBTztLQUU3Qjs7OztJQUNELFFBQVE7UUFFTixJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ3BCO2dCQUNFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixpQkFBaUIsRUFBRSxDQUFDO2dCQUNwQixjQUFjLEVBQUUsbUJBQW1CLENBQUMsS0FBSzthQUMxQzs7WUFFRDtnQkFDRSxVQUFVLEVBQUUsR0FBRztnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3JCLGdCQUFnQixFQUFFLEVBQUU7Z0JBQ3BCLGVBQWUsRUFBRSxFQUFFO2FBQ3BCO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDZjtTQUNGLENBQUM7S0FDSDs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsaUdBQTJDOzthQUU1Qzs7Ozs7NEJBSUUsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neEdhbGxlcnlPcHRpb25zLCBOZ3hHYWxsZXJ5SW1hZ2UsIE5neEdhbGxlcnlBbmltYXRpb24gfSBmcm9tICduZ3gtZ2FsbGVyeSc7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1nYWxsZXJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGdhbGxlcnlPcHRpb25zOiBOZ3hHYWxsZXJ5T3B0aW9uc1tdO1xuICBASW5wdXQoKSBnYWxsZXJ5SW1hZ2VzOiBOZ3hHYWxsZXJ5SW1hZ2VbXTtcbiAgQElucHV0KCkgd2lkdGg6IGFueSA9IFwiMTAwJVwiO1xuICBASW5wdXQoKSBoZWlnaHQ6IGFueSA9ICc0MDBweCc7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5nYWxsZXJ5T3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIHRodW1ibmFpbHNDb2x1bW5zOiA0LFxuICAgICAgICBpbWFnZUFuaW1hdGlvbjogTmd4R2FsbGVyeUFuaW1hdGlvbi5TbGlkZVxuICAgICAgfSxcbiAgICAgIC8vIG1heC13aWR0aCA4MDBcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogODAwLFxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgaW1hZ2VQZXJjZW50OiA4MCxcbiAgICAgICAgdGh1bWJuYWlsc1BlcmNlbnQ6IDIwLFxuICAgICAgICB0aHVtYm5haWxzTWFyZ2luOiAyMCxcbiAgICAgICAgdGh1bWJuYWlsTWFyZ2luOiAyMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNDAwLFxuICAgICAgICBwcmV2aWV3OiBmYWxzZVxuICAgICAgfVxuICAgIF07XG4gIH1cbn1cbiJdfQ==