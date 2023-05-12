'use client'

import { BiSearch } from 'react-icons/bi'

const Search = () => {
    return (
        <div className="
            w-full
            md:w-auto
            py-2
            transition
            cursor-pointer
            text-palette-dark
            border-palette-dark
            bg-red-50
            rounded-t-md
            border-b-2
        ">
            <div className="
                flex
                flex-row
                items-center
                justify-between
            ">
                <div className="
                    text-sm
                    font-semibold
                    px-6
                ">
                    <p>Where</p>
                </div>
                <div className="
                    hidden
                    sm:block
                    text-sm
                    font-semibold
                    px-6
                    border-x-[1px]
                    border-palette-dark
                    flex-1
                    text-center
                ">
                    <p>When</p>
                </div>
                <div className="
                    text-sm
                    pl-6
                    pr-2
                    flex
                    flex-row
                    items-center
                    gap-3
                ">
                    <div className="hidden sm:block">Add Guests</div>
                    <div className="
                        p-2
                        rounded-full
                        text-palette-dark
                    ">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search