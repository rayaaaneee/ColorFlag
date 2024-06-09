import { FaGoogle } from "react-icons/fa";

import Tooltip from '../usefuls/tooltip';
import ConnectionButton from './connection-button';

export interface GoogleConnectionButtonProps {

}

const GoogleConnectionButton = ({}: GoogleConnectionButtonProps) => 
    (<Tooltip text={"Google"}>
        <ConnectionButton colorClassName="bg-red-500" hoverColorClassName="hover:bg-red-600">
            <FaGoogle className="w-1/3 h-1/3" />
        </ConnectionButton>
    </Tooltip>)

export default GoogleConnectionButton;
