import {Button} from "@ui/components/button";

export default function Page(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl p-4">Hello, this assignment was Submitted by Sayan Biswas</h1>
            <div className="flex justify-center items-center gap-2">
                <Button variant="outline">Outline Button</Button>
                <Button><a href="/assets/1">Go to <code>&nbsp;/assets</code></a></Button>
            </div>
            <div className="flex mt-4">
                <svg className="h-10 w-10" viewBox="0 0 101 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M97 52.3137V31.451L50.5 4L4 31.451V87.451M97 52.3137L50.5 24.8627L23.0227 40.2353V55.6078L35.7045 48.006L50.5 39.1373L85.0368 60M97 52.3137L85.0368 60M95.9432 87.451V66.5882L85.0368 60M95.9432 87.451L50.5 61.098L4 87.451M95.9432 87.451L50.5 116L4 87.451"
                        stroke="black" strokeWidth="8" strokeLinejoin="round"></path>
                </svg>
                <h1 className="text-3xl font-bold">CUBIK</h1>
            </div>
        </div>
    );
}
