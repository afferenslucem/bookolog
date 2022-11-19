import { useFormContext } from 'react-hook-form';
import { BookData } from '../../../../../../common/models/book/book-data';
import { TextField } from '@mui/material';
import './PageProgressInput.scss';

export default function PageProgressInput() {
    const {register, watch, formState: {errors}} = useFormContext<BookData>();

    return (
        <div data-testid="page-progress" className="page-progress">
            <TextField error={!!errors['doneUnits']}
                       type="number"
                       label="Done"
                       data-testid="done"
                       className="page-progress__input"
                       {...register('doneUnits', { min: 0, max: 32000, required: false, valueAsNumber: true })} />

            <span className="page-progress__separator">of</span>

            <TextField error={!!errors['totalUnits']}
                       type="number"
                       label="Total"
                       data-testid="total"
                       className="page-progress__input"
                       {...register('totalUnits', { min: 0, max: 32000, required: false, valueAsNumber: true })} />
        </div>
    )
}
