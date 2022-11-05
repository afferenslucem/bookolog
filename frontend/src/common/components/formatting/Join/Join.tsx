export default function Join(props: { value: string[] | null, separator?: string , className?: string }) {
    const {value, separator} = props;

    return (
        <span className={props.className}>
            {
                value?.length
                    ? value.join(separator ?? ', ')
                    : 'Unknown author'
            }
        </span>
    )
}
