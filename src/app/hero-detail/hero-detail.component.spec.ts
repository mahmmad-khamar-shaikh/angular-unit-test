import { TestBed, ComponentFixture, fakeAsync, flush, async,tick } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('Hero Detail component', () => {
    let mockActivatedRoutService;
    let mockHeroService;
    let mockLocationService;
    let fixture: ComponentFixture<HeroDetailComponent>;
    beforeEach(() => {
        mockActivatedRoutService = {
            snapshot: {
                paramMap: {
                    get: () => { return '3'; }
                }
            }
        };
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocationService = jasmine.createSpyObj(['back']);
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoutService },
            { provide: HeroService, useValue: mockHeroService },
            { provide: Location, useValue: mockLocationService }
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({ id: 1, name: 'Iron Man', strength: 6 }))
    });
    it('should render hero name in h2 tag', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('IRON MAN');

    });
    it('should call uupdate hero when save is called ', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();
        fixture.componentInstance.save();
        tick(250);
        //flush(); either use flush or tick with specific time
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));

    // it('should call uupdate hero when save is called with promish ', async(() => {
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();
    //     fixture.componentInstance.save();
    //     fixture.whenStable().then(()=>{
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //     });

        
    // }));
});