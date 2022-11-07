import { Capitalizer } from "../../../utils/capitalizer";

export default function Capitalize(props: { value: string, className?: string }) {
    const {value} = props;

    return (
        <span className={props.className}>
            {
                new Capitalizer().capitalize(value)
            }
        </span>
    )
}
