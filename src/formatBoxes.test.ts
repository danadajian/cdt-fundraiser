import {formatBoxes, getBoxesTotal} from "../cron-job/formatBoxes";

describe('formatBoxes', () => {
    let result: any;

    beforeEach(() => {
        result = formatBoxes([
            {name: 'Person 1', number: 1},
            {name: 'Person 2', number: 90},
            {name: 'Person 1', number: 300},
            {name: 'Person 3', number: 88},
            {name: 'Person 2', number: 6},
        ]);
    });

    it('should return expected result', () => {
        expect(result).toEqual(`Donation History:\n\nPerson 1: $1, $300\nPerson 2: $6, $90\nPerson 3: $88`);
    });
});

describe('getBoxesTotal', () => {
    let result: any;

    beforeEach(() => {
        result = getBoxesTotal([
            {name: 'Person 1', number: 1},
            {name: 'Person 2', number: 90},
            {name: 'Person 1', number: 300},
            {name: 'Person 3', number: 88},
            {name: 'Person 2', number: 6},
        ]);
    });

    it('should return expected result', () => {
        expect(result).toEqual(485);
    });
});