import { FC } from 'react';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { currentProfile } from '@/lib/current-profile';
import { ChannelType } from '@prisma/client';
import ServerHeader from './server-header';

interface serverSidebarProps {
    serverId: string;
}

const ServerSidebar: FC<serverSidebarProps> = async ({ serverId }) => {
    const profile = await currentProfile();

    if (!profile) return redirect('/');

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: 'asc',
                },
            },
        },
    });

    const textChannels = server?.channels.filter(
        (channel) => channel.type === ChannelType.TEXT
    );

    const audioChannels = server?.channels.filter(
        (channel) => channel.type === ChannelType.AUDIO
    );

    const videoChannels = server?.channels.filter(
        (channel) => channel.type === ChannelType.VIDEO
    );

    const members = server?.members.filter(
        (member) => member.profileId !== profile.id
    );

    if (!server) return redirect('/');

    const role = server.members.find(
        (member) => member.profileId === profile.id
    )?.role;
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader server={server} role={role} />
        </div>
    );
};

export default ServerSidebar;
