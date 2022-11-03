import React, { useEffect, useState } from "react";

type UseInputValue = [
    state: {
        value: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    },
    reset: () => void,
]
export function useInput(initialValue: string): UseInputValue {
    const [value, setValue] = useState(initialValue);
    return [
        { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value) },
        () => setValue(initialValue)
    ]
}

export function useOnInit(routine: () => void) {
    return useEffect(routine, []);
}
