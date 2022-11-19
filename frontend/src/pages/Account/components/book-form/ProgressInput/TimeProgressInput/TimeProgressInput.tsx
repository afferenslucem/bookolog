import TimeInput from './TimeInput/TimeInput';
import './TimeProgressInput.scss';
import { useFormContext } from 'react-hook-form';
import { BookData } from '../../../../../../common/models/book/book-data';

export default function TimeProgressInput() {
    const {getValues, setValue} = useFormContext<BookData>();

    const values = getValues(['doneUnits', 'totalUnits']);

    return (
        <div data-testid="time-progress" className="time-progress">
            <TimeInput value={values[0]} onChange={data => setValue('doneUnits', data)}/>
            <span>of</span>
            <TimeInput value={values[1]} onChange={data => setValue('totalUnits', data)}/>
        </div>
    )
}
