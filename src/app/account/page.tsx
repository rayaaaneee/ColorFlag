import Select, { SelectDataSourceInterface } from "@/components/inputs/select";

const Account = () => {

    const genders: SelectDataSourceInterface[] = [
        {
            name: "Man",
            value: true
        },
        {
            name: "Woman",
            value: false
        },
        {
            name: "Unspecified",
            value: null
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