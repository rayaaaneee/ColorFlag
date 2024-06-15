interface PageProps {
    params: { 
        sport: string; 
    };
}

const Page = ({ params }: PageProps) => {

    const { sport } = params;

    return (<></>);
}

export default Page;