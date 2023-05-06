'use client'

import { IconType } from "react-icons"

interface ButtonProps {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`
                realtive
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                trainsition
                w-full
                ${outline ? 
                    'bg-transparent border-[1px] border-palette-dark text-palette-dark' : 
                    'bg-palette-dark text-palette-light'}
                ${small ? 
                    'text-sm py-1 font-light border-[1px]' : 
                    'text-md py-3 font-semibold border-2'}
                `
            }>
            {Icon && (
                <Icon 
                    size={24}
                    className="
                        aboslute
                        left-4
                        top-3
                    "
                />
            )}
            {label}
        </button>
    )
}

export default Button