import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useOnInit } from "../../utils/hooks";

export default function Loader(props: any) {
    const [open, setOpen] = useState(false);

    useOnInit(() => setOpen(true))

    return (
        <Backdrop open={open} sx={{color: '#fff'}} {...props}>
            <CircularProgress size="3rem" color="inherit"/>
        </Backdrop>
    )
}
