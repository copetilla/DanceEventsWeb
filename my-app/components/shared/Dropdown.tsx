import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { IStyle } from '@/lib/database/models/style.model'
import { Input } from '../ui/input'

//imports for Textarea

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { StyleForm } from '@/lib/validator'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"
import { useToast } from "@/components/ui/use-toast"
import { Button } from '../ui/button'
import { getAllStyles } from '@/lib/actions/style.actions'

//types

type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
    //States

    const [styles, setStyles] = useState<IStyle[]>([]);
    const [NewStyle, setNewStyle] = useState('');
    const [NewStyleDescription, setNewStyleDescription] = useState('');

    //Textarea form

    const { toast } = useToast()

    const formStyle = useForm<z.infer<typeof StyleForm>>({
        resolver: zodResolver(StyleForm),
    })

    function onSubmitStyle(data: z.infer<typeof StyleForm>) {
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })
        toast({
            description: "Your message has been sent.",
        })

    }

    useEffect(() => {
        const getStyles = async () => {
            const styleList = await getAllStyles()

            styleList && setStyles(styleList as IStyle[])
        }

        getStyles();
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent>
                {styles.length > 0 && styles.map(style => (
                    <SelectItem key={style._id} value={style._id}
                        className='select-item p-regular-14'>
                        {style.name}
                    </SelectItem>
                ))}
                <AlertDialog>
                    <AlertDialogTrigger
                        className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'
                    >Other</AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>The style is not listed?</AlertDialogTitle>
                            <AlertDialogDescription>
                                If you want to add a new style, you can fill our form and we'll search for it.
                                <Form {...formStyle}>
                                    <form onSubmit={(e) => {
                                        e.stopPropagation();
                                        formStyle.handleSubmit(onSubmitStyle)(e);
                                    }} className="w-2/3 space-y-6 mt-3">

                                        <FormField
                                            control={formStyle.control}
                                            name="style"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Style" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={formStyle.control}
                                            name="descriptionStyle"
                                            render={({ field }) => (

                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell us a little bit about the style"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SelectContent>
        </Select>
    )
}

export default Dropdown