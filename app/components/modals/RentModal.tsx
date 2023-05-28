'use client'

import { useState, useMemo } from "react"
import { FieldValues, useForm, useWatch } from "react-hook-form"
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import useRentModal from "@/app/hooks/useRentModal"

import Modal from "./Modal"
import Heading from "../Heading"
import { neighborhoods } from "../navbar/Neighborhoods"
import CategoryInput from "../inputs/CategoryInput"
import PlacesInput from "../inputs/PlacesInput"


enum STEPS {
    NEIGHBORHOOD = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.NEIGHBORHOOD)
    const [center, setCenter] = useState({lat: 36.7174027, lng: -4.446979})
    const [isPlaceSelected, setIsPlaceSelected] = useState(false)

    const libraries = useMemo(() => ['places'], []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as any,
    })

    const locationBounds = {
        east: -4.337004,
        north: 36.758088,
        south: 36.677453,
        west: -4.558477,
    }

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: {
            errors,
        },
        reset,
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            neighborhood: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })

    const neighborhood = useWatch({
        control,
        name: 'neighborhood'
    })
    const address = useWatch({
        control,
        name: 'address'
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const handlePlacesSelect = (latLng: google.maps.LatLngLiteral) => {
        setCenter(latLng)
        setIsPlaceSelected(true)
    }

    const onBack = () => {
        setStep(value => value - 1)
    }

    const onNext = () => {
        setStep(value => value + 1)
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.NEIGHBORHOOD) {
            return undefined
        }

        return 'Back'
    }, [step])

    let bodyContent = (
        <div className = "flex flex-col gap-8">
            <Heading 
                title="Which neighborhood is your unit located in?"
                subtitle="Choose a neighborhood"
            />
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
            ">
                {neighborhoods.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(neighborhood) => setCustomValue('neighborhood', neighborhood)}
                            selected={neighborhood === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="
                flex flex-col gap-8
            ">
                <Heading 
                    title="What is your listing's address?"
                    subtitle="Help potential tenants find you."
                />
                {isLoaded ? (
                    <>
                        <PlacesInput 
                            id="address"
                            type="address"
                            label="Address"
                            register={register}
                            bounds={locationBounds}
                            onClick={handlePlacesSelect}
                            required
                        />
                        <GoogleMap
                            center={center}
                            zoom={isPlaceSelected ? 16 : 10}
                            options={{
                                disableDefaultUI: true,
                                restriction: {
                                    latLngBounds: locationBounds,
                                    strictBounds: false,
                                },
                                zoomControl: true,
                            }}
                            mapContainerStyle={{ width: '100%', height: '400px' }}
                            onLoad={() => console.log('Map Component Loaded...')}
                        >
                            {isPlaceSelected && <Marker
                                position={center}
                            />}
                        </GoogleMap>
                    </>
                ) : (
                    <div>
                        Google Maps has encountered and error
                    </div>
                )}
            </div>
        )
    }

    return (
        <Modal 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.NEIGHBORHOOD ? undefined : onBack}
            title="Create a listing"
            body={bodyContent}
        />
    )
}

export default RentModal