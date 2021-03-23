import {formatBoxes} from "../cron-job/formatBoxes";

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
        expect(result).toEqual([
            {name: 'Person 1', boxes: [1, 300]},
            {name: 'Person 2', boxes: [90, 6]},
            {name: 'Person 3', boxes: [88]}
        ]);
    });
});