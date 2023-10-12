import { FC, ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { redirectToSignIn } from '@clerk/nextjs';

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import ServerSidebar from '@/components/server/server-sidebar';

interface serverIdLayoutProps {
    children: ReactNode;
    params: { serverId: string };
}

const ServerIdLayout: FC<serverIdLayoutProps> = async ({
    children,
    params,
}) => {
    const profile = await currentProfile();
    if (!profile) return redirectToSignIn();

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (!server) return redirect('/');
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">{children}</main>
        </div>
    );
};

export default ServerIdLayout;
