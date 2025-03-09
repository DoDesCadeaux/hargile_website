import TestGSAP from "@/components/testGSAP";
import TestScroll from "@/components/testScroll";
import TestThree from "@/components/testThree";

export default function Home() {
    return (
        <div>
            <h1 className={'text-center mt-10 text-5xl'}>Hargile Website</h1>
            <h1 className={'text-center mt-10 text-3xl'}>GSAP Animation :</h1>
            <TestGSAP/>
            <h1 className={'text-center mt-10 text-3xl'}>Lenis Smooth Scrolling with GSAP Animation : </h1>
            <TestScroll/>
            <h1 className={'text-center mt-10 text-3xl'}>ThreeJS </h1>
            <TestThree/>
        </div>
    );
}
