import {calculateDaysBetweenTwoDays} from '../src/client/js/updateUi';

describe('CalculateDaysBetween', () => {

    test('function should be defined', () => {
        window.alert = () => {
        };
        expect(calculateDaysBetweenTwoDays).toBeDefined();
    });

    test('5 days between two dates', () => {
        window.alert = () => {
        };

        let number = calculateDaysBetweenTwoDays(new Date('2022-05-05').getTime(), new Date('2022-05-10').getTime());
        expect(number).toBe(5);
    });


});