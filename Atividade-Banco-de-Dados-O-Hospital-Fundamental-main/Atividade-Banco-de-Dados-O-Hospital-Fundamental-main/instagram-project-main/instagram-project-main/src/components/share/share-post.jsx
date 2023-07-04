import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import CloseIcon from "../../images/close-x.svg"
import EmptyCircleIcon from "../../images/empty-circle.svg"
import CheckCircleIcon from "../../images/check-circle.svg"
import ImageExample from "../../images/feed-images/image-example.jpg"

function GenerateProfilePicture({ ImageSource, Name }) {
    const [active, setActive] = useState(false);

    function changeState() {
        setActive((previous) => {
            return !previous
        })
    }

    return (
        <div onClick={changeState} className="flex items-center w-full transition rounded-lg hover:bg-slate-50 hover:scale-105 hover:cursor-pointer">
            <div className="rounded-full p-2">
                <div className=" bg-white rounded-full w-full h-full">
                    <Image className="rounded-full w-[45px] h-[45px]" src={ImageSource} alt={Name} width={45} height={45} />
                </div>
            </div>

            <p className="ml-[14px] font-semibold text-xs">{Name}</p>
            <Image className="ml-auto mr-2" src={active ? CheckCircleIcon : EmptyCircleIcon} alt="Compartilhar" />
        </div>
    )
}

export default function SharePost({ UserList, Clicked }) {
    UserList.map((index) => {
        index.ActiveState = false
    })

    const [searchQuery, setSearchQuery] = useState("");
    const [checkActivity, setActivity] = useState(false);
    const inputRef = useRef();

    const filteredUsers = useMemo(() => {
        return UserList.filter(user => {
            return user.name.toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [UserList, searchQuery])

    const filteredActive = useMemo(() => {
        return UserList.filter(user => {
            return user.ActiveState === true
        })
    })

    return (
        <>
            <div onClick={Clicked} id="share-false" className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-20 z-30"></div>
            <div id="share-false" className="bg-white rounded-t-lg rounded-b-lg fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] max-[500px]:w-screen flex flex-col z-30">
                <div className="flex w-full items-center py-2 px-4 border-b font-semibold">
                    <p className="ml-auto">Compartilhamento</p>
                    <Image onClick={Clicked} className="ml-auto transition hover:scale-150 hover:cursor-pointer" src={CloseIcon} alt="Fechar" />
                </div>

                <div className="flex p-4 gap-4">
                    <p className="font-semibold">Para: </p>
                    <input onChange={event => setSearchQuery(event.target.value)} className="w-full placeholder:text-xs outline-none" placeholder="Pesquisar.."></input>
                </div>

                <ul className="list-none flex flex-col gap-y-4 p-4 max-h-[290px] overflow-y-auto">
                    <li key={uuidv4()}><p className="font-semibold text-sm">Sugestões: </p></li>
                    {filteredUsers.map((item, index) => {
                        return (
                            <li key={uuidv4()}><GenerateProfilePicture ImageSource={item.image} Name={item.name} /></li>
                        )
                    })}
                </ul>

                <div className="p-4">
                    <button className={` bg-blue-200 w-full h-10 rounded-lg text-white font-semibold text-xs transition hover:bg-blue-500`}>Enviar</button>
                </div>
            </div>
        </>
    )
}