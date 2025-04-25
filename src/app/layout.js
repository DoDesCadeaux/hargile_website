"use client"
import "./styles/global.scss";
import {routing} from "@/i18n/routing";
import RootClientWrapper from "@/components/layout/RootClientWrapper";
import {useEffect, useState} from "react";
import Loading from "@/components/Loading";


export default function RootLayout({children}) {

    return (
        <html lang={routing.defaultLocale ?? 'en'}>
        <body style={{overflowX: 'hidden'}}>
        <RootClientWrapper>
            {children}
        </RootClientWrapper>
        </body>
        </html>
    );
}
