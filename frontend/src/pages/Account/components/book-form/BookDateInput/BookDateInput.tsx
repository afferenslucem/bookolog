import { BookDate } from "../../../../../common/models/book/book-date";
import { TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import './BookDateInput.scss';
import { useForm } from 'react-hook-form';
import { BookData } from '../../../../../common/models/book/book-data';

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type SetValueFunc = Dispatch<SetStateAction<number | null>>;
type OnChangeFunc = (value: BookDate) => void;

type BookFormValue = {
    [K in keyof BookDate]: string
}

interface Props {
    value?: BookDate;
    onChange: OnChangeFunc;
    label?: string;
}

export default function BookDateInput(props: Props) {
    const { watch, register, getValues, formState: { errors } } = useForm<BookFormValue>({reValidateMode: 'onBlur'});

    const { year, month, day } = watch()

    useEffect(() => {
        const value = getValues();
        const fixed = fixFields(value);
        props.onChange(fixed);
        console.debug(errors)
    }, [year, month, day])

    return (
        <div className="book-date-input">
            {
                props.label && <label className="book-date-input__label"> {props.label} </label>
            }
            <div className="book-date-input__body">
                <TextField error={errors.year != null}
                           type="number"
                           label="Year"
                           data-testid="year"
                           {...register('year', { min: 1950, max: new Date().getFullYear() })} />

                <TextField error={errors.month != null}
                           type="number"
                           label="Month"
                           data-testid="month"
                           {...register('month', { min: 1, max: 12 })} />

                <TextField error={errors.day != null}
                           type="number"
                           label="Day"
                           data-testid="day"
                           {...register('day', { min: 1, max: 31 })} />
            </div>
        </div>
    )
}

function fixFields(date: BookFormValue): BookDate {
    const result = {} as BookDate;

    for (const key in date) {
        result[key] = Number(date[key])
    }

    return result;
}
