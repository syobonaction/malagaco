'use client'

import { IconType } from "react-icons"

interface CategoryInputProps {
    onClick: (value: string) => void
    selected?: boolean
    label: string
    icon: IconType
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    onClick,
    selected,
    label,
    icon: Icon,
}) => {
    return (
        <div 
            onClick={() => onClick(label)}
            className={`
                rounded-xl
                border-2
                p-4
                flex
                flex-col
                gap-3
                text-palette-dark
                hover:border-palette-dark
                transition
                cursor-pointer
                ${selected ? 'border-palette-dark' : 'border-neutral-200'}
            `}
        >
            <Icon size={30}/>
            <div className="font-semibold">
                {label}
            </div>
        </div>
    )
}

export default CategoryInput