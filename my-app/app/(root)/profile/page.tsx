import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string

    const organizedEvents = await getEventsByUser({ userId, page: 1 })
    return (
        <>
            {/* My Tickets */}
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex items-center justify-center sm:justify-between'>
                    <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
                    <Button asChild className='button hidden sm:flex'>
                        <Link href='/#events'>Explore More Events</Link>
                    </Button>
                </div>
            </section>
            <section className='wrapper my-8'>
                <Collection
                    data={[]}
                    emptyTitle='No Events Tickets Purchased'
                    emptyStateSubtext='No worries - plenty of exciting events to explore!'
                    collectionType='All_Events'
                    limit={3}
                    page={1}
                    urlParamName='ordersPage'
                    totalPages={2}
                />
            </section>
            {/* My Events */}
            <section>

            </section>
            {/* Events Organized */}

            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex items-center justify-center sm:justify-between'>
                    <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
                    <Button asChild className='button hidden sm:flex'>
                        <Link href='/events/create'>Create Event</Link>
                    </Button>
                </div>
            </section>

            <section className='wrapper my-8'>
                <Collection
                    data={organizedEvents?.data}
                    emptyTitle='No Events Have Been Created Yet'
                    emptyStateSubtext='Go and create a dance event!'
                    collectionType='All_Events'
                    limit={3}
                    page={1}
                    urlParamName='ordersPage'
                    totalPages={2}
                />
            </section>
        </>
    )
}

export default ProfilePage