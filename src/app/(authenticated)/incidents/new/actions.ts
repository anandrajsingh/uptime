// app/incidents/new/actions.ts
'use server'

import { auth } from '@/auth';
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createIncident(monitorId: string) {

    const session = await auth()
        if (!session || !session.user?.id) {
            return { error: 'Unauthorized' };
        }
    
  try {
    const incident = await db.incident.create({
      data: {
        monitorId
      }
    });

    revalidatePath('/incidents'); // if you have a list page
    return { id: incident.id };
  } catch (error) {
    console.error('Error creating incident:', error);
    return { error: 'Failed to create incident' };
  }
}

export async function getMonitors(){
    const session = await auth()
    if (!session || !session.user?.id) {
        return { error: 'Unauthorized' };
    }

    try {
        const monitorList = await db.monitor.findMany({
            where: {
                userId: session.user?.id
            }
        })
        return {monitorList}
    } catch (error) {
        console.log(error)
    }
}