"use client"

import { useFieldArray, type UseFieldArrayReturn, useForm, type UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { Form, FormField } from "~/components/ui/form"
import { Card, CardContent, CardTitle } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { Input } from "~/components/ui/input"
import { cn, markToLabel, roundToDigits } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { PlusIcon, TrashIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"


const FormSchema = z.object({
    semesters: z.array(z.object({
        name: z.string(),
        subjects: z.array(z.object({
            name: z.string(),
            grade: z.number().min(0, "Grade must be at least 0").max(100, "Grade must be between 0 and 100"),
            credits: z.number().min(1, "Credits must be greater than 0")
        }))
    })).min(1, "At least one semester is required")
})

type FormType = z.infer<typeof FormSchema>

function Semester({
    semesterIndex,
    semestersFieldArray,
    form,
}: {
    semesterIndex: number,
    semestersFieldArray: UseFieldArrayReturn<FormType, "semesters">,
    form: UseFormReturn<FormType>,
}) {
    const [gpa, setGpa] = useState(0)

    const subjects = useFieldArray({
        control: form.control,
        name: `semesters.${semesterIndex}.subjects`
    })

    // Calculate GPA on subjects change
    useEffect(() => {
        // Manually trigger validation for subjects
        form.trigger(`semesters.${semesterIndex}.subjects`).then((isValid) => {

            // If subjects are not valid, set GPA to 0
            if (!isValid) {
                setGpa(0)
                return
            }

            // Calculate GPA
            const subjects = form.getValues(`semesters.${semesterIndex}.subjects`)
            const totalCredits = subjects.reduce((acc, subject) => acc + subject.credits, 0)
            const totalGrade = subjects.reduce((acc, subject) => acc + subject.grade * subject.credits / totalCredits, 0)
            setGpa(roundToDigits(totalGrade, 2))
        }).catch(() => {
            // If any error occurs, set GPA to 0
            setGpa(0)
        })
    }, [subjects, semesterIndex, form])

    return (
        <Card key={semesterIndex} className="w-full border-emerald-400">
            <CardTitle className="flex justify-center font-bold text-xl p-4">
                <div className="flex-grow flex items-center">
                    <Input
                        {...form.register(`semesters.${semesterIndex}.name`)}
                        className="w-fit"
                        placeholder="Semester name"
                    />
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon"

                            variant="destructive"
                            onClick={() => semestersFieldArray.remove(semesterIndex)}
                        >
                            <TrashIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-red-500">Delete semester</TooltipContent>
                </Tooltip>
            </CardTitle>
            <Separator className="bg-emerald-500" />
            <CardContent className="flex flex-col gap-y-4">
                <div className="pt-4 grid grid-cols-10 gap-x-4">
                    <p className="pl-1 col-span-3 font-semibold text-sm uppercase">Subject name</p>
                    <p className="pl-1 col-span-3 font-semibold text-sm uppercase">Grade %</p>
                    <p className="pl-1 col-span-3 font-semibold text-sm uppercase">Credits</p>
                    <div className="col-span-1"></div>
                </div>

                {subjects.fields.map((_, subjectIndex) => (
                    <div key={subjectIndex} className="grid grid-cols-10 gap-x-4">
                        <FormField
                            control={form.control}
                            name={`semesters.${semesterIndex}.subjects.${subjectIndex}.name`}
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col col-span-3">
                                    <Input
                                        {...field}
                                        className={cn("", fieldState.error && "border-red-500")}
                                        placeholder="Subject name"
                                    />
                                    <p className="text-red-500">{fieldState.error?.message}</p>
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`semesters.${semesterIndex}.subjects.${subjectIndex}.grade`}
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col col-span-3">
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            // Inputs are always strings, so we need to convert them to numbers
                                            field.onChange(Number(e.target.value))
                                        }}
                                        type="number"
                                        className={cn("", fieldState.error && "border-red-500")}
                                        placeholder="Grade"
                                    />
                                    <p className="text-red-500">{fieldState.error?.message}</p>
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`semesters.${semesterIndex}.subjects.${subjectIndex}.credits`}
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col col-span-3">
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            // Inputs are always strings, so we need to convert them to numbers
                                            field.onChange(Number(e.target.value))
                                        }}
                                        type="number"
                                        className={cn("", fieldState.error && "border-red-500")}
                                        placeholder="Credits"
                                    />
                                    <p className="text-red-500">{fieldState.error?.message}</p>
                                </div>
                            )}
                        />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => subjects.remove(subjectIndex)}
                                >
                                    <TrashIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-red-500">Delete course</TooltipContent>
                        </Tooltip>
                    </div>
                ))}

                <div className="flex gap-4 mt-6">
                    <div className="flex-grow">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button

                                    size="icon"
                                    onClick={() => subjects.append({ name: "", grade: 0, credits: 5 })}
                                >
                                    <PlusIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Add course</TooltipContent>
                        </Tooltip>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Mark: {gpa}% ({markToLabel(gpa)})</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function GPACalculator() {
    const [hasLoaded, setHasLoaded] = useState(false)

    // Form setup
    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            semesters: []
        }
    })

    // Extract semesters field array
    const semesters = useFieldArray({
        control: form.control,
        name: "semesters"
    })

    useEffect(() => {
        const semesters = localStorage.getItem("semesters")
        if (semesters) {
            form.setValue("semesters", JSON.parse(semesters) as FormType["semesters"])
        }
        setHasLoaded(true)
    }, [form])

    // Save to local storage on change
    const formWatch = form.watch()
    useEffect(() => {
        if (hasLoaded) {
            const values = form.getValues()
            localStorage.setItem("semesters", JSON.stringify(values.semesters))
        }
    }, [hasLoaded, formWatch, form])

    // Will be called on form submission
    const onSubmit = (_data: FormType) => {
        return
    }

    return (
        <TooltipProvider>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="items-center flex flex-col h-full">
                    <div className="fixed bottom-10 right-10">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="h-12 aspect-square"
                                    onClick={() => semesters.append({ name: "", subjects: [{ name: "", grade: 0, credits: 5 }] })}
                                >
                                    <PlusIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Add semester</TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex flex-col h-full gap-10">
                        <div className="text-center flex flex-col gap-1">
                            <h1 className="text-2xl font-bold">GPA Calculator</h1>
                            <p className="text-md font-light">Calculate your GPA with this tool</p>
                        </div>

                        {semesters.fields.length === 0 && (
                            <div className="flex flex-col flex-grow items-center justify-center text-center">
                                <p className="text-3xl font-bold text-primary">You haven&apos;t added any semesters yet! </p>
                                <p className="text-xl font-thin text-primary">Click the button in the corner to add a semester</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-32 lg:pb-10">
                            {semesters.fields.map((semester, semesterIndex) => (
                                <Semester
                                    key={semester.id}
                                    semesterIndex={semesterIndex}
                                    semestersFieldArray={semesters}
                                    form={form}
                                />
                            ))}
                        </div>
                    </div>
                </form>
            </Form>
        </TooltipProvider>
    )
}
