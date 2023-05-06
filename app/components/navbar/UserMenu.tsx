'use client'

import { useState, useCallback } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value)
    }, [])

    return (
        <div className="relative">
            <div className="
                flex
                flex-row
                items-center
                gap-3
            ">
                <div 
                    onClick={() => {}} 
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        border-palette-dark
                        hover:border-b-2
                        transition-all
                        cursor-pointer
                ">
                    For Hosts
                </div>
                <div className="
                    hidden
                    md:block
                    py-3
                    border-palette-dark
                    border-r-[1px]
                "></div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-palette-dark
                        hover:border-b-2
                        flex
                        flex-row
                        items-center
                        gap-3
                        cursor-pointer
                        transition-all
                ">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && 
                <div className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                ">
                    <div className="flex flex-col cursor-pointer">
                        <>
                            <MenuItem 
                                onClick={() => {}}
                                label="Login"
                            />
                            <MenuItem 
                                onClick={() => {}}
                                label="Sign Up"
                            />
                        </>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserMenu