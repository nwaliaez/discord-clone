import { Server, Members, Profile } from '@prisma/client';

export type ServerWithMembersWithProfiles = Server & {
    members: (Members & { profile: Profile })[];
};
