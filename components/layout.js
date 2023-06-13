import Head from "next/head";

export default function Layout({children,title='Web-Set-Hunt'}){
    return(
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/png" href="/microbus.jpeg" />
            </Head>
            {children}
        </>
    )
}