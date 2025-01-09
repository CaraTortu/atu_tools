"use client"

import { Label } from "@radix-ui/react-label"
import React, { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import { Slider } from "~/components/ui/slider"
import { Button } from "~/components/ui/button"
import { useToast } from "~/hooks/use-toast"

type MarkType = {
    semester5: {
        computerVision: number,
        researchProject: number,
        softwareEngineering: number,
        devops: number,
        serverside: number,
    },
    semester6: {
        legalIssues: number,
        predictiveAnalytics: number,
        projectDevelopment: number,
        computerScience: number,
        uxDesign: number,
    }
}

const FIVE_CREDIT_PERCENTAGE = 5 / 30

const calculateS5Total = (markState: MarkType) => {
    const marks = markState.semester5
    let total = 0

    total += marks.computerVision * FIVE_CREDIT_PERCENTAGE
    total += marks.researchProject * FIVE_CREDIT_PERCENTAGE * 2
    total += marks.softwareEngineering * FIVE_CREDIT_PERCENTAGE
    total += marks.devops * FIVE_CREDIT_PERCENTAGE
    total += marks.serverside * FIVE_CREDIT_PERCENTAGE

    // Rounded to 2 decimal places
    total = Math.round(total * 100) / 100
    return total
}

const calculateS6Total = (markState: MarkType) => {
    const marks = markState.semester6
    let total = 0

    total += marks.legalIssues * FIVE_CREDIT_PERCENTAGE
    total += marks.predictiveAnalytics * FIVE_CREDIT_PERCENTAGE
    total += marks.projectDevelopment * FIVE_CREDIT_PERCENTAGE * 2
    total += marks.computerScience * FIVE_CREDIT_PERCENTAGE
    total += marks.uxDesign * FIVE_CREDIT_PERCENTAGE

    // Rounded to 2 decimal places
    total = Math.round(total * 100) / 100
    return total
}

const calculateTotal = (markState: MarkType) => {
    const result = (calculateS5Total(markState) + calculateS6Total(markState)) / 2

    // Rounded to 2 decimal places
    return Math.round(result * 100) / 100
}

const getMarkLabel = (mark: number) => {
    if (mark < 50) return "Class 3 Honours"
    if (mark < 60) return "Class 2.2 Honours"
    if (mark < 70) return "Class 2.1 Honours"
    return "Class 1 Honours"
}

const Semester5Inputs: React.FC<{ markState: MarkType, setMarkState: Dispatch<SetStateAction<MarkType>> }> = ({ markState, setMarkState }) => {
    return (
        <div className="flex flex-col mt-6 gap-4 w-full items-center">
            <div className="grid w-full max-w-sm items-center gap-2">
                <Label>Computer Vision</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester5.computerVision]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester5: {
                                ...prev.semester5,
                                computerVision: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester5.computerVision}%</p>
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Research in Computing</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester5.researchProject]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester5: {
                                ...prev.semester5,
                                researchProject: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester5.researchProject}%</p>
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Software Engineering</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester5.softwareEngineering]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester5: {
                                ...prev.semester5,
                                softwareEngineering: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester5.softwareEngineering}%</p>
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>DevOps</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester5.devops]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester5: {
                                ...prev.semester5,
                                devops: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester5.devops}%</p>
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Server Side Scripting</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester5.serverside]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester5: {
                                ...prev.semester5,
                                serverside: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester5.serverside}%</p>
                </div>
            </div>
        </div>
    )
}

const Semester6Inputs: React.FC<{ markState: MarkType, setMarkState: Dispatch<SetStateAction<MarkType>> }> = ({ markState, setMarkState }) => {
    return (
        <div className="flex flex-col mt-6 gap-4 w-full items-center">
            <div className="grid w-full max-w-sm items-center gap-2">
                <Label>Legal Issues in Computing</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester6.legalIssues]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester6: {
                                ...prev.semester6,
                                legalIssues: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester6.legalIssues}%</p>
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Predictive Analytics</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester6.predictiveAnalytics]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester6: {
                                ...prev.semester6,
                                predictiveAnalytics: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester6.predictiveAnalytics}%</p>
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Project Development</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester6.projectDevelopment]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester6: {
                                ...prev.semester6,
                                projectDevelopment: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester6.projectDevelopment}%</p>
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Computer Science</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester6.computerScience]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester6: {
                                ...prev.semester6,
                                computerScience: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester6.computerScience}%</p>
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>UX Design</Label>
                <div className="flex gap-2">
                    <Slider value={[markState.semester6.uxDesign]} min={0} max={100} onValueChange={(v) => {
                        setMarkState((prev) => ({
                            ...prev,
                            semester6: {
                                ...prev.semester6,
                                uxDesign: v[0]!
                            }
                        }))
                    }} />
                    <p>{markState.semester6.uxDesign}%</p>
                </div>
            </div>
        </div>
    )
}

export default function GPACalculator() {
    const { toast } = useToast()
    const [hasLoaded, setHasLoaded] = useState(false)
    const [markState, setMarkState] = useState<MarkType>({
        semester5: {
            computerVision: 0,
            researchProject: 0,
            softwareEngineering: 0,
            devops: 0,
            serverside: 0,
        },
        semester6: {
            legalIssues: 0,
            predictiveAnalytics: 0,
            projectDevelopment: 0,
            computerScience: 0,
            uxDesign: 0,
        }
    })

    const saveMarks = (marks: MarkType) => {
        localStorage.setItem("marks", JSON.stringify(marks))
    }

    const loadMarks = () => {
        const marks = localStorage.getItem("marks")

        if (marks) {
            setMarkState(JSON.parse(marks) as MarkType)
        }

        setHasLoaded(true)
    }

    useEffect(() => {
        loadMarks()
    }, [])

    useEffect(() => {
        if (hasLoaded)
            saveMarks(markState)
    }, [markState, hasLoaded])

    return (
        <div className="w-full flex-grow flex flex-col items-center  pt-10">
            <h1 className="text-3xl font-bold">GPA calculator</h1>
            <div className="w-[80%] flex flex-col gap-10 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-2 place-items-center flex-grow">
                    <div className="h-full w-full flex flex-col items-center justify-center">
                        <p className="text-xl">Semester 5 Grades</p>
                        <Semester5Inputs markState={markState} setMarkState={setMarkState} />
                        <div className="mt-8 w-fit px-4 p-2 rounded-lg bg-secondary border-2 border-blue-400 text-secondary-foreground">
                            Total: {calculateS5Total(markState)}% ({getMarkLabel(calculateS5Total(markState))})
                        </div>
                    </div>
                    <div className="h-full w-full flex flex-col items-center justify-center">
                        <p className="text-xl">Semester 6 Grades</p>
                        <Semester6Inputs markState={markState} setMarkState={setMarkState} />
                        <div className="mt-8 w-fit px-4 p-2 rounded-lg bg-secondary border-2 border-blue-400 text-secondary-foreground">
                            Total: {calculateS6Total(markState)}% ({getMarkLabel(calculateS6Total(markState))})
                        </div>
                    </div>
                </div>
                <div className="col-span-2 w-full flex flex-col items-center justify-center size-fit">
                    <div className="bg-secondary rounded-lg p-2 w-fit px-4 border-2 border-blue-600">
                        Combined Total: {calculateTotal(markState)}% ({getMarkLabel(calculateTotal(markState))})
                    </div>
                    <div className="gap-2 grid grid-cols-2 mt-2">
                        <Button variant="default" onClick={() => { saveMarks(markState); toast({ title: "Saved!" }) }} className="w-full">Save</Button>
                        <Button variant="destructive" onClick={() => setMarkState({
                            semester5: {
                                computerVision: 0,
                                researchProject: 0,
                                softwareEngineering: 0,
                                devops: 0,
                                serverside: 0,
                            },
                            semester6: {
                                legalIssues: 0,
                                predictiveAnalytics: 0,
                                projectDevelopment: 0,
                                computerScience: 0,
                                uxDesign: 0,
                            }
                        })} className="w-full">Reset</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

