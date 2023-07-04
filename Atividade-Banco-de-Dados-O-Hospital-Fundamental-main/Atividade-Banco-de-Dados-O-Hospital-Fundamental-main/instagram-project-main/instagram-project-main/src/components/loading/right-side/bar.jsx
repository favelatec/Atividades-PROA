import { v4 as uuidv4 } from 'uuid';

function UserRecomendationComponent() {
    return (
        <div className="flex items-center mt-2">
            <div className="p-0.5 rounded-full w-[40px] h-[40px] bg-slate-200"></div>

            <div className="flex items-center">
                <div className="mx-4 max-w-[170px]">
                    <div className="w-[75px] h-[15px] bg-slate-200"></div>
                    <div className="ml-auto w-[150px] h-[20px] bg-slate-200 mt-1"></div>
                </div>

                <div className="w-[50px] h-[15px] bg-slate-200"></div>
            </div>
        </div>
    )
}

function MiniButton({ Name }) {
    return (
        <p className="text-gray-500 text-xs hover:cursor-pointer hover:underline">{Name}</p>
    )
}

export default function RightSideBar() {
    const Options = [
        "Sobre", "Ajuda", "Imprensa", "API", "Carreiras", "Privacidade", "Termos", "Localizações",
        "Idioma", "Meta Verified"
    ]

    return (
        <div className="mr-6 animate-pulse">
            <div className="flex items-center mt-8 mb-3">
                <div className="p-0.5 bg-slate-200 rounded-full w-[56px] h-[56px]"></div>

                <div className="flex items-center w-[225px]">
                    <div className="mx-4">
                        <div className="w-[75px] h-[15px] bg-slate-200"></div>
                        <div className="w-[150px] h-[20px] bg-slate-200 mt-2"></div>
                    </div>

                    <div className="w-[75x] h-[15px] ml-auto"></div>
                </div>
            </div>

            <div className="flex items-center mb-3">
                <div className="w-[150px] h-[20px] bg-slate-200"></div>
                <div className="ml-auto w-[50px] h-[15px] bg-slate-200"></div>
            </div>

            <ul className="list-none mb-3">
                {[...Array(5).keys()].map((index) => {
                    return <li key={uuidv4()}>
                        <UserRecomendationComponent />
                    </li>
                })}
            </ul>

            <ul className="list-disc max-w-[280px] mb-3">
                {Options.map((index) => {
                    return (<li key={uuidv4()} className="inline-flex items-center align-baseline before:content-['\00B7'] before:mx-1">
                        <MiniButton Name={index} />
                    </li>)
                })}
            </ul>


            <p className="text-gray-500 text-xs">© 2023 INSTAGRAM FROM META</p>
        </div>
    )
}