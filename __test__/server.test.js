import {getTemperature} from '../src/server/server';

describe('Get Temperature', () => {

    test('function should be defined', () => {
        window.alert = () => {
        };
        expect(getTemperature).toBeDefined();
    });


});