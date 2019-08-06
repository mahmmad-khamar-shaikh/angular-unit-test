import { StrengthPipe } from "./strength.pipe";

describe('strength pipe check', () => {
    it('should display weak when strength is 5', () => {
        let pipe = new StrengthPipe();
        expect(pipe.transform(5)).toEqual('5 (weak)');
    });
});
