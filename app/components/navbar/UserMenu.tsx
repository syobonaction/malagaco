'use client'

import { useState, useCallback } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useRentModal from '@/app/hooks/useRentModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
}) => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const rentModal = useRentModal()
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value)
    }, [])

    const onRent = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen()
        }

        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    return (
        <div className="relative">
            <div className="
                flex
                flex-row
                items-center
                gap-3
            ">
                <div 
                    onClick={onRent} 
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        hover:border-palette-dark
                        border-transparent
                        border-b-2
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
                        hover:border-palette-dark
                        border-transparent
                        border-b-2
                        flex
                        flex-row
                        items-center
                        gap-3
                        cursor-pointer
                        transition-all
                ">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
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
                        {currentUser ? (
                            <>
                                <MenuItem 
                                    onClick={() => {}}
                                    label="My housing"
                                />
                                <MenuItem 
                                    onClick={() => {}}
                                    label="My favorites"
                                />
                                <MenuItem 
                                    onClick={() => {}}
                                    label="My properties"
                                />
                                <MenuItem 
                                    onClick={rentModal.onOpen}
                                    label="Create a listing"
                                />
                                <hr />
                                <MenuItem 
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem 
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem 
                                    onClick={registerModal.onOpen}
                                    label="Sign up"
                                />
                            </>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default UserMenu