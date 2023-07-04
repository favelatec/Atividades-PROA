export default function Feed() {
    return (
        <div className="max-w-[570px] p-4 flex flex-col bg-slate-100 animate-pulse">
            <div className="flex items-center gap-4 p-2 w-full">
                <div className="p-0.5 rounded-full w-[60px] h-[60px] bg-slate-200"></div>

                <div className="font-bold w-[200px] h-[20px] bg-slate-200"></div>
                <div className="ml-auto w-[50px] h-[25px] bg-slate-200 rounded-full"></div>
            </div>

            <div className="w-full h-[720px] bg-slate-300"></div>

            <div className="flex items-center gap-4 p-2 w-full mb-1.5 bg-slate-200">
                <div className="w-[24px] h-[24px] bg-slate-300 rounded-full"></div>
                <div className="w-[24px] h-[24px] bg-slate-300 rounded-full"></div>
                <div className="w-[24px] h-[24px] bg-slate-300 rounded-full"></div>
            </div>

            <div className="pl-2 w-[200px] bg-slate-300 h-[20px]"></div>
            <div className="pl-2 w-[400px] bg-slate-300 h-[20px] mt-2"></div>
        </div>
    )
}