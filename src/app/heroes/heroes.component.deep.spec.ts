import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('HerosComponet', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROS;
    let mockService;
    beforeEach(() => {
        HEROS = [
            { id: 1, name: 'Iron Man', strength: 6 },
            { id: 2, name: 'Spider Man', strength: 8 },
            { id: 1, name: 'Captain America', strength: 9 },
            { id: 1, name: 'Thor', strength: 10 },
            { id: 1, name: 'Hulk', strength: 10 }];
        mockService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent,HeroComponent],
            providers: [{ provide: HeroService, useValue: mockService }],
            schemas:[NO_ERRORS_SCHEMA]

        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render all hero component ', () => {
        mockService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
        const heroComponentDe= fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDe.length).toBe(5);

    });

});