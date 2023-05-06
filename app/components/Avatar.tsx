'use client'

import Image from "next/image"

const Avatar = () => {
    return (
        <Image 
            className="rounded-full"
            height={30}
            width={30}
            alt="user avatar"
            src="/images/placeholder.jpg"
        />
    )
}

export default Avatar