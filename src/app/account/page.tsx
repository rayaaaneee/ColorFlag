import Select, { type SelectDataSourceInterface } from "@/components/inputs/select";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "My account",
}

const Account = () => {

    const genders: SelectDataSourceInterface[] = [
        {
            name: "Man",
            id: true
        },
        {
            name: "Woman",
            id: false
        },
        {
            name: "Unspecified",
            id: null
        }
    ]

    return (
        <Select
            dataSources={genders}
            itemName="gender"
        />
    );
}

export default Account;