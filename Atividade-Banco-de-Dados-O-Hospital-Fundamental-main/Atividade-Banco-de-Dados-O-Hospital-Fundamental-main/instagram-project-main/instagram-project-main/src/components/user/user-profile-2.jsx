import { v4 as uuidv4 } from "uuid"
import Image from "next/image";

import UserRecomendationComponent from "../user/user-profile-recomended";
import GenerateRecommendedFollowers from '../hooks/generate-recommended-followers';

import RightSideBar from "../loading/right-side/bar"

function MiniButton({ Name }) {
    return (
        <p className="text-gray-500 text-xs hover:cursor-pointer hover:underline">{Name}</p>
    )
}

export default function UserProfile({ ImageSource, Name, FullName }) {
    const [RecommendationUsers, loadingState] = GenerateRecommendedFollowers()

    const Options = [
        "Sobre", "Ajuda", "Imprensa", "API", "Carreiras", "Privacidade", "Termos", "Localizações",
        "Idioma", "Meta Verified"
    ]


    return (
        <>
            {loadingState ? <RightSideBar /> :
                <div className="mr-6">
                    <div className="flex items-center mt-8 mb-3">
                        <div className="p-0.5 bg-gray-100 rounded-full w-[56px]">
                            <div className="p-2 bg-white rounded-full">
                                <Image className="rounded-full" src={ImageSource} alt={Name} width={45} height={45} />
                            </div>
                        </div>

                        <div className="flex items-center w-[225px]">
                            <div className="mx-4">
                                <p className="text-left text-xs font-bold max-w-[75px]">{Name}</p>
                                <p className="text-left text-sm max-w-[150px]">{FullName}</p>
                            </div>

                            <p className="text-blue-500 text-center text-xs ml-auto hover:cursor-pointer">Mudar</p>
                        </div>
                    </div>

                    <div className="flex items-center mb-3">
                        <p className="font-semibold text-sm text-gray-500">Sugestões para você</p>
                        <p className="font-semibold text-xs ml-auto hover:text-gray-500 hover:cursor-pointer">Ver tudo</p>
                    </div>

                    <ul className="list-none mb-3">
                        {RecommendationUsers.map((index) => {
                            return (<li key={uuidv4()}>
                                <UserRecomendationComponent ImageSource={index.image} Name={index.name} Reason={index.reason} />
                            </li>)
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
                </div>}
        </>
    )
}