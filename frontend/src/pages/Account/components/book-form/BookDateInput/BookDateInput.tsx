import { TextField } from "@mui/material";
import './BookDateInput.scss';
import { useFormContext } from 'react-hook-form';

interface Props {
    propertyPrefix?: string;
    label?: string;
    ['data-testid']: string;
}

export default function BookDateInput(props: Props) {
    const {label, propertyPrefix} = props;
    const { register, formState: { errors } } = useFormContext<any>();

    const yearProp = propertyPrefix + 'DateYear';
    const monthProp = propertyPrefix + 'DateMonth';
    const dayProp = propertyPrefix + 'DateDay';

    return (
        <div className="book-date-input" data-testid={props["data-testid"]}>
            {
                label && <div className="book-date-input__label"> {label} </div>
            }
            <div className="book-date-input__body">
                <TextField error={!!errors[yearProp]}
                           type="number"
                           label="Year"
                           data-testid="year"
                           {...register(yearProp, { min: 1950, max: new Date().getFullYear(), required: false, valueAsNumber: true })} />

                <TextField error={!!errors[monthProp]}
                           type="number"
                           label="Month"
                           data-testid="month"
                           {...register(monthProp, { min: 0, max: 12, required: false, valueAsNumber: true })} />

                <TextField error={!!errors[dayProp]}
                           type="number"
                           label="Day"
                           data-testid="day"
                           {...register(dayProp, { min: 0, max: 31, required: false, valueAsNumber: true })} />
            </div>
        </div>
    )
}
