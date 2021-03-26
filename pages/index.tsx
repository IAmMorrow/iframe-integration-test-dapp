import React from "react";
import dynamic from 'next/dynamic'
import {useRouter} from "next/router";


const DAPPMain = dynamic(() => import('../src/components/DAPPMain'), {
    ssr: false
})

const AppLoaderPage = () => {
    const router = useRouter();

    return (
        <DAPPMain embed={router.query.embed === "true"} />
    );
};

export default AppLoaderPage;
