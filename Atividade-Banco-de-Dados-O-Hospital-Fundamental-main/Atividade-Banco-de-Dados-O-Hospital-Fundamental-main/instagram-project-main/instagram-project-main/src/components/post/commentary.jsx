import { faker } from '@faker-js/faker';
import { useId } from 'react';
import Image from "next/image"

import ImageExample from "../../images/feed-images/image-example.jpg"
import Bookmark from "../../images/bookmark-icon.svg"
import HeartIcon from "../../images/heart-icon.svg"
import LikeHeartIcon from "../../images/like-heart-icon.svg"
import MessageIcon from "../../images/messages-icon.svg"
import MoreIcon from "../../images/more-horizontal.svg"
import SendIcon from "../../images/send-icon.svg"

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
            <Image onClick={() => MoreOptionOnClick()} className="rounded-full hover:cursor-pointer transition ml-auto hover:scale-150" src={MoreIcon} alt={"Mais opções"} />

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

export default function Commentary({ UsersList, Clicked, ToggleOptions, PostOwner, CommentariesList }) {

    return (
        <>
            <div onClick={() => Clicked()} id="commentary-false" className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-20"></div>
            <div id="commentary-false" className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex">
                    <div className="w-[500px] h-[600px]">
                        <Image className="object-cover w-full h-full" src={PostOwner.ImageSource} alt={"Publicação"} width={1280} height={720} />
                    </div>
                    <div className="flex flex-col bg-white w-[500px] h-[600px]">
                        {/* Owner */}
                        <div className="flex items-center border-b">
                            <GenerateProfilePicture MoreOptionOnClick={() => ToggleOptions()} ImageSource={PostOwner.ProfilePicture} Name={PostOwner.Name} />
                        </div>
                        {/* Commentaries */}
                        <ul className="list-none flex flex-col overflow-y-auto">
                            <li><CommentaryComponent ImageSource={PostOwner.ProfilePicture} Name={PostOwner.Name} Description={PostOwner.Text} /></li>
                            {CommentariesList.map((index) => {
                                console.log(index)
                                return (
                                    <li>
                                        <CommentaryComponent ImageSource={index.ImageSource} Name={index.Name} Description={index.Text} />
                                    </li>
                                )
                            })}
                        </ul>
                        {/* User interaction */}
                        <div className="border-t mt-auto">
                            <div className="flex items-center gap-4 p-2 w-full mb-1.5 transition hover:cursor-pointer">
                                <Image className="transition hover:scale-150" src={HeartIcon} alt="Gostar" width={24} />
                                <Image onClick={() => CommentaryToggle()} className="transition hover:scale-150" src={MessageIcon} alt="Comentar" />
                                <Image className="transition hover:scale-150" src={SendIcon} alt="Compartilhar" />
                                <Image className="transition hover:scale-150 ml-auto" src={Bookmark} alt="Bookmark" />
                            </div>

                            <p className="font-semibold p-2">{PostOwner.LikesQuantity} Curtiram</p>
                            <input className="w-full p-4 border-t placeholder:text-xs outline-none" placeholder="Adicione um comentário.."></input>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}