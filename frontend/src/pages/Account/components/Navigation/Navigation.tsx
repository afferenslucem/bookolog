import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import './Navigation.scss';

interface NavigationProps {
    onClick: () => void;
}

export default function Navigation(props: NavigationProps) {

    return (
        <div onClick={props.onClick} className="navigation">
            <div className="navigation__section">
                <Link to="./in-progress">
                    <ChromeReaderModeOutlinedIcon/> In Progress
                </Link>
                <Link to="./to-read">
                    <BookmarkBorderOutlinedIcon/> To Read
                </Link>
                <Link to="./done">
                    <CheckCircleOutlineIcon /> Done
                </Link>
            </div>
        </div>
    )
}
