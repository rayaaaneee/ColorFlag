

import CardLink, { Card } from "@/components/usefuls/card-link";
import verifyIcon from "@/asset/img/pages/dev/verify.png";
import countriesArray from "@/asset/data/countries.json";
import Country from "@/useful/interfaces/country";
import NotFound from "@/components/not-found";
import DEV_MODE from "@/useful/dev-mode";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dev",
}

const DevPage = () => {

    let countries = countriesArray as Country[];

    const cardsContent: Card[] = [
        {
            image: verifyIcon,
            title: "Treat all SVGs",
            imgClass: "w-1/2",
            description: "Treat all SVGs for setting selectables shapes",
            href: `/dev/verify/country/${countries.at(0)?.code}`,
        }
    ]
    
    if (!DEV_MODE) {
        return (<NotFound />);
    }

    return (
        <>
            <div className="flex flex-row gap-5 items-center justify-center">
                { cardsContent.map((el: Card, index: number) => {
                    return (<CardLink heightClass="min-h-[20rem]" element={el} key={`cardlink-${index}`} />);
                }) }
            </div>
        </>
    );
}

export default DevPage;