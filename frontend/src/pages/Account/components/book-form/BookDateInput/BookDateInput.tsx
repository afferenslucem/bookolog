import { BookDate } from "../../../../../common/models/book/book-date";
import { TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import './BookDateInput.scss';

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type SetValueFunc = Dispatch<SetStateAction<number | null>>;
type OnChangeFunc = (value: BookDate) => void;

interface Props {
    value?: BookDate;
    onChange: OnChangeFunc;
    label?: string;
}

export default function BookDateInput(props: Props) {
    const [year, setYear] = useState(props.value?.year ?? null);
    const [month, setMonth] = useState(props.value?.month ?? null);
    const [day, setDay] = useState(props.value?.day ?? null);

    useEffect(() => {
        props.onChange({
            year,
            month,
            day
        })
    }, [year, month, day])

    return (
        <div className="book-date-input">
            {
                props.label && <label className="book-date-input__label"> {props.label} </label>
            }
            <div className="book-date-input__body">
                <TextField type="number" label="Year" data-testid="year" onChange={(e) => handleNumberChange(e, setYear)} />
                <TextField type="number" label="Month" data-testid="month" onChange={(e) => handleNumberChange(e, setMonth)} />
                <TextField type="number" label="Day" data-testid="day" onChange={(e) => handleNumberChange(e, setDay)} />
            </div>
        </div>
    )
}

function handleNumberChange(e: InputChangeEvent, setValue: SetValueFunc): void {
    const value = e.target.value;

    if (value == null) {
        setValue(null);
    }else {
        const nextValue = Number(value);

        setValue(nextValue);
    }
}
