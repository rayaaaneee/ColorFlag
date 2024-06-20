import { HeadingOne } from "@/components/utils/headings";

export interface PageProps {
    searchParams: {
        continent_code: string;
    }
}

const Page = ({ searchParams: { continent_code } }: PageProps) => {

    return (
        <div>
            <HeadingOne>
                Guess the shape of
            </HeadingOne> 
        </div>
    );
}

export default Page;