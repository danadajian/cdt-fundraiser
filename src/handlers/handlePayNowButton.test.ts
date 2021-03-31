import {handlePayNowButton} from "./handlePayNowButton";
import {retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {BOXES_BUCKET_NAME, BOXES_TAKEN_FILE_NAME} from "../constants";

jest.mock("../aws/aws");
window.alert = jest.fn();

const state = {
    selectedBoxNumbers: [69, 420],
    boxesTaken: [
        {name: 'Person 1', number: 1},
        {name: 'Person 2', number: 90},
        {name: 'Person 1', number: 300},
        {name: 'Person 3', number: 88},
        {name: 'Person 2', number: 6}
    ],
    paymentComplete: false
};
const setState = jest.fn();
const name = 'My Name';

describe('handlePayNowButton', () => {
    describe('current state of the world matches', () => {
        beforeEach(() => {
            (uploadObjectToS3 as jest.Mock).mockImplementation(() => Promise.resolve());
            (retrieveObjectFromS3 as jest.Mock).mockResolvedValue({
                boxes: [
                    {name: 'Person 1', number: 1},
                    {name: 'Person 2', number: 90},
                    {name: 'Person 1', number: 300},
                    {name: 'Person 3', number: 88},
                    {name: 'Person 2', number: 6}
                ]
            });
            handlePayNowButton({state, setState}, name);
        });

        it('should call retrieveObjectFromS3 with correct params', () => {
            expect(retrieveObjectFromS3).toHaveBeenCalledWith(BOXES_BUCKET_NAME, BOXES_TAKEN_FILE_NAME);
        });

        it('should call uploadObjectToS3 with correct params', () => {
            expect(uploadObjectToS3).toHaveBeenCalledWith({
                boxes: [
                    {name: 'Person 1', number: 1},
                    {name: 'Person 2', number: 90},
                    {name: 'Person 1', number: 300},
                    {name: 'Person 3', number: 88},
                    {name: 'Person 2', number: 6},
                    {name, number: 69},
                    {name, number: 420}
                ],
                latestContributor: name,
                latestContribution: 489
            }, BOXES_BUCKET_NAME, BOXES_TAKEN_FILE_NAME);
        });
    });

    describe('current state of the world does not match', () => {
        beforeEach(() => {
            (uploadObjectToS3 as jest.Mock).mockImplementation(() => Promise.resolve());
            (retrieveObjectFromS3 as jest.Mock).mockResolvedValue({
                boxes: [
                    {name: 'Person 1', number: 1},
                    {name: 'Person 2', number: 90},
                    {name: 'Person 1', number: 300},
                    {name: 'Person 3', number: 88},
                    {name: 'Person 4', number: 73},
                    {name: 'Person 2', number: 6}
                ]
            });
            handlePayNowButton({state, setState}, name);
        });

        it('should not call uploadObjectToS3', () => {
            expect(uploadObjectToS3).not.toHaveBeenCalled();
        });

        it('should alert the user', () => {
            expect(window.alert).toHaveBeenCalled();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
