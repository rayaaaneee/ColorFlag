import { FaFacebookF } from "react-icons/fa6";

import Tooltip from '../usefuls/tooltip';
import ConnectionButton from './connection-button';

export interface FacebookConnectionButtonProps {

}

const FacebookConnectionButton = ({}: FacebookConnectionButtonProps) => 
    (<Tooltip text={"Facebook"}>
        <ConnectionButton colorClassName="bg-blue-900" hoverColorClassName="hover:bg-blue-950">
            <FaFacebookF className="w-1/3 h-1/3" />
        </ConnectionButton>
    </Tooltip>)


export default FacebookConnectionButton;

