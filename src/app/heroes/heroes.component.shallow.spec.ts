import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Component, Input } from "@angular/core";
import { of } from "rxjs";
import { Hero } from "../hero";

describe('HerosComponet', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROS;
    let mockService;
    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
    }
    beforeEach(() => {
        HEROS = [
            { id: 1, name: 'Iron Man', strength: 6 },
            { id: 2, name: 'Spider Man', strength: 8 },
            { id: 1, name: 'Captain America', strength: 9 },
            { id: 1, name: 'Thor', strength: 10 },
            { id: 1, name: 'Hulk', strength: 10 }];
        mockService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent],
            providers: [{ provide: HeroService, useValue: mockService }]
            
        });
        fixture = TestBed.createComponent(HeroesComponent);


    });

    it('should create heros component correctly ', () => {
        mockService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(5);
    });

});
