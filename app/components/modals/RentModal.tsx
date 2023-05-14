'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useState, useMemo } from "react"
import Heading from "../Heading"
import { neighborhoods } from "../navbar/Neighborhoods"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, useForm } from "react-hook-form"

enum STEPS {
    NEIGHBORHOOD = 0,
    INFO = 1,
    IMAGES = 2,
    DESCRIPTION = 3,
    PRICE = 4,
}

const RentModal = () => {
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.NEIGHBORHOOD)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
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

    const neighborhood = watch('neighborhood')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
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

    return (
        <Modal 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.NEIGHBORHOOD ? undefined : onBack}
            title="Create a listing"
            body={bodyContent}
        />
    )
}

export default RentModal