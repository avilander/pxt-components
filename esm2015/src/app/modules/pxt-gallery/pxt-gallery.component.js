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
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            $('ngx-gallery-image').css({ 'z-index': "1" });
        }, 3);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFzQyxtQkFBbUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVF0RixNQUFNO0lBTUo7cUJBRnNCLE1BQU07c0JBQ0wsT0FBTztLQUU3Qjs7OztJQUNELFFBQVE7UUFFTixJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ3BCO2dCQUNFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixpQkFBaUIsRUFBRSxDQUFDO2dCQUNwQixjQUFjLEVBQUUsbUJBQW1CLENBQUMsS0FBSzthQUMxQzs7WUFFRDtnQkFDRSxVQUFVLEVBQUUsR0FBRztnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3JCLGdCQUFnQixFQUFFLEVBQUU7Z0JBQ3BCLGVBQWUsRUFBRSxFQUFFO2FBQ3BCO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDZjtTQUNGLENBQUM7S0FDSDs7OztJQUVELGVBQWU7UUFDYixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNQOzs7WUEzQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixpR0FBMkM7O2FBRTVDOzs7Ozs0QkFJRSxLQUFLO29CQUNMLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmd4R2FsbGVyeU9wdGlvbnMsIE5neEdhbGxlcnlJbWFnZSwgTmd4R2FsbGVyeUFuaW1hdGlvbiB9IGZyb20gJ25neC1nYWxsZXJ5JztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWdhbGxlcnknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0R2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZ2FsbGVyeU9wdGlvbnM6IE5neEdhbGxlcnlPcHRpb25zW107XG4gIEBJbnB1dCgpIGdhbGxlcnlJbWFnZXM6IE5neEdhbGxlcnlJbWFnZVtdO1xuICBASW5wdXQoKSB3aWR0aDogYW55ID0gXCIxMDAlXCI7XG4gIEBJbnB1dCgpIGhlaWdodDogYW55ID0gJzQwMHB4JztcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLmdhbGxlcnlPcHRpb25zID0gW1xuICAgICAge1xuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgdGh1bWJuYWlsc0NvbHVtbnM6IDQsXG4gICAgICAgIGltYWdlQW5pbWF0aW9uOiBOZ3hHYWxsZXJ5QW5pbWF0aW9uLlNsaWRlXG4gICAgICB9LFxuICAgICAgLy8gbWF4LXdpZHRoIDgwMFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA4MDAsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICBpbWFnZVBlcmNlbnQ6IDgwLFxuICAgICAgICB0aHVtYm5haWxzUGVyY2VudDogMjAsXG4gICAgICAgIHRodW1ibmFpbHNNYXJnaW46IDIwLFxuICAgICAgICB0aHVtYm5haWxNYXJnaW46IDIwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA0MDAsXG4gICAgICAgIHByZXZpZXc6IGZhbHNlXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoJ25neC1nYWxsZXJ5LWltYWdlJykuY3NzKHsgJ3otaW5kZXgnOiBcIjFcIiB9KTtcbiAgICB9LCAzKTtcbiAgfVxuXG59XG4iXX0=