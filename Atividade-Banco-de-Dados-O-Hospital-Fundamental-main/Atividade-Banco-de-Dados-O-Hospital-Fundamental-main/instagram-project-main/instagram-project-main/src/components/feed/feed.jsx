import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import Image from "next/image"

import Bookmark from "../../images/bookmark-icon.svg"
import HeartIcon from "../../images/heart-icon.svg"
import LikeHeartIcon from "../../images/like-heart-icon.svg"
import MessageIcon from "../../images/messages-icon.svg"
import MoreIcon from "../../images/more-horizontal.svg"
import SendIcon from "../../images/send-icon.svg"

function ToggleVisibility(elementName) {
    let elementList = document.querySelectorAll(`[id^=${elementName}]`)
    elementList.forEach((element) => {
        element.id = element.id == `${elementName}-false` ? `${elementName}-true` : `${elementName}-false`
    })
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

function GenerateProfilePicture({ ImageSource, Name, MoreOptionOnClick }) {
    return (
        <div className="flex items-center pl-4 py-[14px] pr-4 w-full">
            <div className="rounded-full hover:cursor-pointer">
                <div className="p-0.5 bg-gradient-to-tr from-amber-500 to-fuchsia-700 rounded-full">
                    <div className="p-1 bg-white rounded-full w-full h-full">
                        <Image className="rounded-full w-[30px] h-[30px]" src={ImageSource} alt={Name} width={30} height={30} />
                    </div>
                </div>
            </div>

            <p className="ml-[14px] font-semibold">{Name}</p>
            <Image onClick={() => MoreOptionOnClick()} className={`rounded-full hover:cursor-pointer transition ml-auto ${!isTouchDevice() && "hover:scale-150"}`} src={MoreIcon} alt={"Mais opções"} />

        </div>
    )
}

function CommentaryComponent({ ImageSource, Name, Description }) {
    return (
        <div className="flex pl-4 py-[14px] pr-4 w-full">
            <div className="rounded-full hover:cursor-pointer">
                <div className="p-0.5 rounded-full">
                    <div className="p-1 bg-white rounded-full w-full h-full">
                        <Image className="rounded-full w-[25px] h-[25px]" src={ImageSource} alt={Name} width={25} height={25} />
                    </div>
                </div>
            </div>

            <div className="ml-[14px] flex flex-col text-sml max-w-[400px]">
                <p><b className="font-semibold">{Name} </b>{Description}</p>
                <p className="text-gray-400 transition hover:cursor-pointer hover:scale-105 hover:font-semibold">Responder</p>
            </div>
        </div>
    )
}

function CommentaryComponents({ Clicked, ToggleOptions, PostOwner, CommentariesList, ActiveState, LikeState, ChangeLikeState }) {
    return (
        <>
            <div onClick={() => Clicked()} id={`commentary-${ActiveState}`} className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50"></div>
            <div id={`commentary-${ActiveState}`} className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20">
                <div className="flex max-lg:flex-col max-lg:overflow-auto max-lg:h-[500px] max-lg:w-[700px] max-md:w-[500px] max-[500px]:w-screen">
                    <div className="bg-white flex items-center border-b lg:hidden">
                        <GenerateProfilePicture MoreOptionOnClick={() => ToggleOptions()} ImageSource={PostOwner.ProfilePicture} Name={PostOwner.Name} />
                    </div>

                    <div className="w-[500px] h-[600px] max-lg:w-full">
                        <Image className="object-cover w-full h-full" src={PostOwner.ImageSource} alt={"Imagem da publicação"} width={1280} height={720} />
                    </div>
                    <div className="flex flex-col bg-white w-[500px] lg:h-[600px] max-lg:w-full">

                        {/* Owner */}
                        <div className="flex items-center border-b max-lg:hidden">
                            <GenerateProfilePicture MoreOptionOnClick={() => ToggleOptions()} ImageSource={PostOwner.ProfilePicture} Name={PostOwner.Name} />
                        </div>
                        {/* Commentaries */}
                        <ul className="list-none flex flex-col overflow-y-auto max-lg:hidden">
                            <li key={uuidv4()}><CommentaryComponent ImageSource={PostOwner.ProfilePicture} Name={PostOwner.Name} Description={PostOwner.Text} /></li>
                            {CommentariesList.map((index) => {
                                return (
                                    <li key={uuidv4()}>
                                        <CommentaryComponent ImageSource={index.ImageSource} Name={index.Name} Description={index.Text} />
                                    </li>
                                )
                            })}
                        </ul>
                        {/* User interaction */}
                        <div className="border-t mt-auto max-lg:mt-0">
                            <div className="flex items-center gap-4 p-2 w-full mb-1.5 transition hover:cursor-pointer">
                                <Image onClick={() => ChangeLikeState()} className={`transition ${!isTouchDevice() && "hover:scale-150"}`} src={LikeState == 0 ? HeartIcon : LikeHeartIcon} alt="Gostar" width={24} />
                                <Image className={`transition ${!isTouchDevice() && "hover:scale-150"}`} src={MessageIcon} alt="Comentar" />
                                <Image onClick={() => ToggleVisibility("share")} className={`transition ${!isTouchDevice() && "hover:scale-150"}`} src={SendIcon} alt="Compartilhar" />
                                <Image className={`transition ${!isTouchDevice() && "hover:scale-150"} ml-auto`} src={Bookmark} alt="Bookmark" />
                            </div>

                            <p className="font-semibold p-2">{PostOwner.LikesQuantity + LikeState} Curtiram</p>
                            <input className="w-full p-4 border-t placeholder:text-xs outline-none" placeholder="Adicione um comentário.."></input>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Feed({ User, PostInformation, OnToggleOptions }) {
    const [like, setLike] = useState(0)
    const [active, setActive] = useState(false)
    const [post, setPost] = useState({
        postOwner: {
            Name: "",
            ProfilePicture: "",
            Text: "",
            ImageSource: "",
            LikesQuantity: 0,
        },
        commentariesList: [],
    });

    function changeState() {
        setActive((previous) => {
            return !previous
        })
    }

    function SetPostInformation(postOwner, commentariesList) {
        setPost((previousValue) => {
            return {
                postOwner: PostInformation.postOwner,
                commentariesList: PostInformation.Commentaries
            }
        })

        changeState()
    }

    function onLike() {
        setLike((prev) => {
            return prev == 1 ? 0 : 1
        })
    }

    return (
        <>

            <CommentaryComponents
                Clicked={() => changeState()}
                ToggleOptions={() => ToggleVisibility("options")}
                PostOwner={PostInformation.postOwner}
                CommentariesList={PostInformation.Commentaries}
                ActiveState={active}
                LikeState={like}
                ChangeLikeState={() => onLike()}
            />
            <div className="max-w-[570px] p-4 grid place-content-center">
                <div className="flex items-center gap-4 p-2 w-full">
                    <div className="p-0.5 bg-gradient-to-tr from-amber-500 to-fuchsia-700 rounded-full">
                        <div className="p-1 bg-white rounded-full">
                            <Image className="rounded-full" src={User.ImageSource} alt={User.Name} width={20} height={20} />
                        </div>
                    </div>

                    <p className="font-bold">{User.Name}</p>
                    <Image onClick={() => OnToggleOptions()} className={`rounded-full hover:cursor-pointer transition ml-auto ${!isTouchDevice() && "hover:scale-150"}`} src={MoreIcon} alt={"Mais opções"} />
                </div>

                <Image src={PostInformation.ImageSource} alt={"Imagem da Publicação"} width={1280} height={720} />

                <div className="flex items-center gap-4 p-2 w-full mb-1.5 transition hover:cursor-pointer">
                    <Image className={`transition ${!isTouchDevice() && "hover:scale-150"} ${active && "hidden"}`} src={like == 0 ? HeartIcon : LikeHeartIcon} alt="Gostar" width={24} onClick={onLike} />
                    <Image onClick={() => SetPostInformation()} className={`transition ${!isTouchDevice() && "hover:scale-150"} ${active && "hidden"}`} src={MessageIcon} alt="Comentar" />
                    <Image onClick={() => ToggleVisibility("share")} className={`transition ${!isTouchDevice() && "hover:scale-150"} ${active && "hidden"}`} src={SendIcon} alt="Compartilhar" />
                    <Image className={`transition ${!isTouchDevice() && "hover:scale-150"} ml-auto ${active && "hidden"}`} src={Bookmark} alt="Bookmark" />
                </div>

                <p className="font-semibold text-sm pl-2">{PostInformation.Likes + like} curtidas</p>
                <p className="text-sm pl-2"><b className="font-semibold">{User.Name} </b>{PostInformation.Description}</p>
                <input className="w-full p-4 border-b placeholder:text-xs outline-none" placeholder="Adicione um comentário.."></input>
            </div>
        </>
    )
}