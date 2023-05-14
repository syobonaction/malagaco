'use client'

import Container from "../Container"
import { TbBeach } from "react-icons/tb"
import { MdNightlife } from "react-icons/md"
import { GiBoatFishing } from "react-icons/gi"
import { MdOutlineHistoryEdu } from "react-icons/md"
import { GiFishingLure } from "react-icons/gi"
import { GiParkBench } from "react-icons/gi"
import { GiFishingHook } from "react-icons/gi"
import { TbBuildingTunnel } from "react-icons/tb"
import { GiPartyFlags } from "react-icons/gi"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"


export const neighborhoods = [
    {
        label: "La Malagueta",
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label: "La Merced",
        icon: MdNightlife,
        description: "This property is close to the beach!"
    },
    {
        label: "El Palo",
        icon: GiBoatFishing,
        description: "This property is close to the beach!"
    },
    {
        label: "El Soho",
        icon: MdOutlineHistoryEdu,
        description: "This property is close to the beach!"
    },
    {
        label: "Pedregalejo",
        icon: GiFishingLure,
        description: "This property is close to the beach!"
    },
    {
        label: "Santa Paula",
        icon: GiParkBench,
        description: "This property is close to the beach!"
    },
    {
        label: "El Perchel",
        icon: GiFishingHook,
        description: "This property is close to the beach!"
    },
    {
        label: "Centro Historico",
        icon: TbBuildingTunnel,
        description: "This property is close to the beach!"
    },
    {
        label: "La Goleta",
        icon: GiPartyFlags,
        description: "This property is close to the beach!"
    },
]

const Neighborhoods = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()

    const isMainPage = pathname === '/'

    if(!isMainPage) {
        return null
    }

    return (
        <Container>
            <div className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            ">
                {neighborhoods.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Neighborhoods