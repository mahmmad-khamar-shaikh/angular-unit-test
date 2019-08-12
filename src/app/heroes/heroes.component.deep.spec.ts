import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Component, Input, NO_ERRORS_SCHEMA, Directive } from "@angular/core";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;
    onClick(){
        this.navigatedTo= this.linkParams;
    }
}

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
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [{ provide: HeroService, useValue: mockService }]
            //            schemas: [NO_ERRORS_SCHEMA]

        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render all hero component ', () => {
        mockService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
        const heroComponentDe = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDe.length).toBe(5);
        for (let i = 0; i < heroComponentDe.length; i++) {
            expect(heroComponentDe[i].componentInstance.hero.name).toEqual(HEROS[i].name);
        }
    });
    it('should call heroservice.delete methods when delete button was clicked', () => {
        spyOn(fixture.componentInstance, 'delete');
        mockService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
        const heroComponentDE = fixture.debugElement.queryAll(By.directive(HeroComponent))
        heroComponentDE[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } })
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROS[0]);

    });


    it('should call heroservice.delete methods when delete button was clicked (calling delete event instead of click)', () => {
        spyOn(fixture.componentInstance, 'delete');
        mockService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
        const heroComponentDE = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponentDE[0].componentInstance).delete.emit(undefined);
        heroComponentDE[0].triggerEventHandler('delete', null);// alternate way to trigger delete event.
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROS[0]);

    });
    it('should add new hero when add hero is clicked', () => {
        mockService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
        const name = 'black widow';
        mockService.addHero.and.returnValue(of({ id: 6, name: name, strength: 6 }));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const buttonElement = fixture.debugElement.queryAll(By.css('button'))[0];
        inputElement.value = name;
        buttonElement.triggerEventHandler('click', null);
        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);


    });

});