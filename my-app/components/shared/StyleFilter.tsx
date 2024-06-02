'use client'

import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { getAllStyles } from '@/lib/actions/style.actions';
import { IStyle } from '@/lib/database/models/style.model';

const StyleFilter = () => {
    const [styles, setStyles] = useState<IStyle[]>([])
    const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(() => {
        const getStyles = async () => {
            const styleList = await getAllStyles()

            styleList && setStyles(styleList as IStyle[])
        }

        getStyles();
    }, [])

    const onSelectStyle = (style: string) => {
        let newUrl = ''
        if (style && style !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'style',
                value: style
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['style']
            })
        }

        router.push(newUrl, { scroll: false })
    }

    return (
        <Select onValueChange={(value: string) => onSelectStyle(value)}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Styles" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className='select-item p-regular-14'>All</SelectItem>
                {styles.map((style) => (
                    <SelectItem value={style.name} key={style._id} className='select-item p-regular-14'>
                        {style.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default StyleFilter