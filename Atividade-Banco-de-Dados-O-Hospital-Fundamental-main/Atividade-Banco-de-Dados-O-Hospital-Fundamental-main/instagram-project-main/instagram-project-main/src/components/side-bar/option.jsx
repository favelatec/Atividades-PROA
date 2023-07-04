import Image from "next/image"

export default function Option({ imageSource, name, isActive, isMobile, isProfile }) {
    return (
        <div className={`flex p-3 max-xl:justify-center my-1 rounded-lg w-full ${isMobile ? "xl:hidden pb-6" : ""} ${isActive ? "bg-slate-100" : ""} hover:bg-slate-100 hover:cursor-pointer transition`}>
            <Image className={isProfile ? "rounded-full" : undefined} src={imageSource} alt={name} width={25} />
            <p className={`ml-4 text-base ${isActive ? "font-bold" : ""} max-xl:hidden`}>{name}</p>
        </div>
    )
}