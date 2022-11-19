import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useNumberInput } from '../../../../../../../common/utils/hooks';
import './TimeInput.scss';

interface Props {
    onChange?: (v: number) => void;
    value?: number;
}

export default function TimeInput(props: Props) {
    const { value, onChange } = props;

    const time = valueToTime(value);

    const [hours, setHours] = useState(time.hours);
    const [minutes, setMinutes] = useState(time.minutes);

    useEffect(() => {
        const nextValue = (hours ?? 0) * 60 + (minutes ?? 0);
        onChange && onChange(nextValue);
    }, [hours, minutes])

    return (
        <div className="time-input">
            <TextField type="number"
                       label="Hours"
                       data-testid="hours"
                       value={hours ?? ''}
                       onChange={e => setNumber(e, setHours)}
            />

            <TextField type="number"
                       label="Minutes"
                       data-testid="minutes"
                       value={minutes ?? ''}
                       onChange={e => setNumber(e, setMinutes)}
            />
        </div>
    )
}

function valueToTime(value?: number): { hours: number | null, minutes: number | null } {
    if (!value) {
        return {
            hours: null,
            minutes: null,
        }
    } else {
        const hours = value / 60 | 0;
        const minutes = value % 60;

        return {
            hours,
            minutes,
        }
    }
}

function setNumber(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunc: (value: number | null) => void) {
    if (e.target.value) {
        setFunc(Number(e.target.value))
    } else {
        setFunc(null)
    }
}
