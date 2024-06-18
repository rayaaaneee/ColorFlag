import continentsArray from "@/asset/data/continents.json";
import type Continent from "@/utils/interfaces/continent";
import { type Metadata } from "next";
import { ClientComponent } from "./_components/client-component";

export const metadata: Metadata = {
    title: 'Choose continent(s)',
};

const Page = () => {

    const continents: Continent[] = continentsArray satisfies Continent[] as Continent[];

    return (
        <>
            <h1>Choose the continent(s) to train :</h1>
            <ClientComponent continents={continents} />
        </>
    );
}

export default Page;
