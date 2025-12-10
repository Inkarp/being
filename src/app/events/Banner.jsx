'use client'

export default function Banner() {
    return (
        <div className="relative h-[200px] bg-white w-[90%] mx-auto rounded-[20px] flex justify-center items-center">
            <div className="">
                <h1 className="text-3xl">Upcoming Events </h1>
            </div>

            <div className="absolute bottom-2 right-5 bg-white w-full max-w-sm p-3 rounded-lg shadow-xl flex items-center gap-2">
                <input
                    type="text"
                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                    placeholder="Search here..."
                />
            </div>
        </div>
    )
}