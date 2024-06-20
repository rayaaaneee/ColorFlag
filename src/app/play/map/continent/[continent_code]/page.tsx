export interface PageProps {
    params: {
        continent_code: string;
    }
}

const Page = ({ params: { continent_code } }: PageProps) => {

    return (
        <div>
            Page
        </div>
    );
}

export default Page;