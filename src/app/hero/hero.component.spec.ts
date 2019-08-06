import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('HeroComponent', () => {
    let fixture: ComponentFixture<HeroComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [HeroComponent],
        schemas:[NO_ERRORS_SCHEMA] });
        fixture = TestBed.createComponent(HeroComponent);
    });
    it('should have correct hero assign ', () => {
        fixture.componentInstance.hero = { id: 1, name: 'batman', strength: 3 };
       expect(fixture.componentInstance.hero.name).toEqual('batman');
    });
    it('should render hero name 0',()=>{
        fixture.componentInstance.hero = { id: 1, name: 'batman', strength: 3 };
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('batman');
    });

});