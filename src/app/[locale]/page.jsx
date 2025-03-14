"use client"

import TestThree from "@/components/testThree";
import Orbitals from "@/components/orbitals";

export default function Home({}) {

    return (
        <div>
            <p className={"text-center text-red-400"}>ThreeJS</p>
            <TestThree/>
            {/*<Orbitals/>*/}
        </div>
    );
}
