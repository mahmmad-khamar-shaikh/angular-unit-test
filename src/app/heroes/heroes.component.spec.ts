import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent (deep)', () => {
    let herosComponent: HeroesComponent;
    let HEROS;
    let mockService;
    beforeEach(() => {
        HEROS = [
            { id: 1, name: 'Iron Man', strength: 6 },
            { id: 2, name: 'Spider Man', strength: 8 },
            { id: 1, name: 'Captain America', strength: 9 },
            { id: 1, name: 'Thor', strength: 10 },
            { id: 1, name: 'Hulk', strength: 10 }];
        mockService = jasmine.createSpyObj(['getHeros', 'addHero', 'deleteHero']);
        herosComponent = new HeroesComponent(mockService);
    });
    describe('delete', () => {
        it('should delete mentioned hero from list of heros', () => {
            mockService.deleteHero.and.returnValue(of(true));
            herosComponent.heroes = HEROS;
            herosComponent.delete(HEROS[1]);

            expect(herosComponent.heroes.length).toBe(4);
        });
        it('should call deleteHero method ', () => { 
            mockService.deleteHero.and.returnValue(of(true));
            herosComponent.heroes = HEROS;
            herosComponent.delete(HEROS[1]);
            expect(mockService.deleteHero).toHaveBeenCalledWith(HEROS[1]);
        });
        
    });
});