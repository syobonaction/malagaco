'use client'

import { ReactElement, useEffect, useState } from 'react'
import { 
    FieldValues, 
    UseFormRegister,
} from 'react-hook-form'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"

export type PlacesSelectValue = {
    label: string
    latlng: number[]
    value: string
}

interface PlacesInputProps {
    type: string
    id: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    label: string
    bounds: google.maps.LatLngBoundsLiteral
    onClick: (latLng: google.maps.LatLngLiteral) => void
}

const PlacesInput: React.FC<PlacesInputProps> = ({
    type,
    id,
    required,
    register,
    label,
    bounds,
    onClick,
}) => {
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            locationRestriction: bounds,
            componentRestrictions: {
                country: 'es',
            }
        },
        debounce: 300,
    })

    useEffect(() => {
        status === "OK" && setIsSuggestionsOpen(true)
    }, [status])


    const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value)
    }

    const handleSelect = (description: string): void => {
        setIsSuggestionsOpen(false)
        setValue(description, false);
        clearSuggestions();
    
        getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0])
            onClick({ lat, lng })
            console.log("📍 Coordinates: ", { lat, lng })
        })
    }

    const renderSuggestions = (): ReactElement => {
        const suggestions = data.map(({ place_id, description }: any) => {
            const isInMalaga = description.includes("Málaga")

            return (isInMalaga && 
                <li 
                    key={place_id} 
                    value={description} 
                    onClick={() => handleSelect(description)}
                    className="
                        p-4
                        w-full
                        hover:bg-slate-100
                        cursor-pointer
                    "
                >{description}</li>
            )
        });
        return (
            <>
                {suggestions}
            </>
        )
    }

    return (
        <div className="w-full relative">
            <input 
                type={type}
                id={id}
                value={value}
                { ...register(id, {required})}
                onChange={handleInput}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    font-light
                    bg-white
                    ${isSuggestionsOpen ? "border-x-2 border-t-2": "border-2"}
                    ${isSuggestionsOpen ? "rounded-t-md": "rounded-md"}
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                `}
            />
            <label className={`
                absolute
                text-md
                duration-150
                transform
                -translate-y-3
                top-5
                left-4
                z-10
                text-zinc-400
                origin-[0]
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
            `}>
                {label}
            </label>
            {status === "OK" && (
                <ul className="
                    absolute
                    z-10
                    bg-white
                    w-full
                    border-x-2
                    border-b-2
                    rounded-b-lg
                    text-palette-dark
                ">
                    {renderSuggestions()}
                </ul>
            )}
        </div>
    )
}

export default PlacesInput