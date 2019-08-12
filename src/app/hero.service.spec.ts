import { TestBed, inject } from "@angular/core/testing";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HeroService } from "./hero.service";


describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroService,
                { provide: MessageService, useValue: mockMessageService }]
        });
        // 1 way of getting reference of service. 
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);

    });
    describe('getHero First method', () => {
        it('should call get with correct url', () => {
            expect(true).toBe(true);
            service.getHero(4).subscribe();
            service.getHero(3).subscribe();
            const req = httpTestingController.expectOne('api/heroes/4');
            req.flush({ id: 1, name: 'Thor', strength: 10 })
            //even if second service call added, this test case still passes.
            // for that below line is used to verify exact match.
            // httpTestingController.verify();
        });


    });


    //Second way of obtaining the serice references. which consumes too much line
    // describe('getHero second mthod',
    //     inject([HeroService, HttpTestingController],
    //         (hservice: HeroService, testingController: HttpTestingController) => {
    //             it('should call get with correct url', () => {
    //                 hservice.getHero(4).subscribe();
    //                 const req = testingController.expectOne('api/heroes/4');
    //                 req.flush({ id: 1, name: 'Thor', strength: 10 })
    //             });

    //         }));

});