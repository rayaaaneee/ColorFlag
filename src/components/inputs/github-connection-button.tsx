import { TbBrandGithubFilled } from "react-icons/tb";

import Tooltip from '../usefuls/tooltip';
import ConnectionButton from './connection-button';

export interface GithubConnectionButtonProps {

}

const GithubConnectionButton = ({}: GithubConnectionButtonProps) => 
    (<Tooltip text={"Github"}>
        <ConnectionButton colorClassName="bg-main" hoverColorClassName="hover:bg-black">
            <TbBrandGithubFilled className="w-2/5 h-2/5" />
        </ConnectionButton>
    </Tooltip>)

    
export default GithubConnectionButton;
