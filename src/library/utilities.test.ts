import { momentFormatted, momentSum } from './utilities';
import moment from 'moment';

describe('momentFormatted', () => {
    it('should format a given date using the specified format', () => {
        const date = '2023-08-29';
        const format = 'YYYY-MM-DD';
        const expectedFormattedDate = '2023-08-29';

        const formattedDate = momentFormatted(date, format);

        expect(formattedDate).toEqual(expectedFormattedDate);
    });

    it('should throw an error if a valid date is not provided', () => {
        expect(() => {
            momentFormatted();
        }).toThrow('A valid date is required.');
    });
});

describe('momentSum', () => {
    it('should add the specified count of units to a given date', () => {
        const date = '2023-08-29';
        const count = 1;
        const unit = 'years';
        const expectedSum = moment(date).add(count, unit);

        const sum = momentSum(date, count, unit);

        expect(sum).toEqual(expectedSum);
    });
});
