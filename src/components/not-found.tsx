"use client";

import ErrorPage from 'next/error';

interface NotFoundInterface {
    statusCode?: number;
}

const NotFound = ({ statusCode = 404 }: NotFoundInterface) => {
    return (<ErrorPage statusCode={statusCode} />);
}

export default NotFound;