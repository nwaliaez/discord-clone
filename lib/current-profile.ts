import { auth } from '@clerk/nextjs';

import { db } from '@/lib/db';

export const currentProfile = async () => {
    const { userId } = auth();

    if (!userId) return null;

    const profile = await db.profile.findUnique({
        where: {
            userId,
        },
    });
    return profile;
};
