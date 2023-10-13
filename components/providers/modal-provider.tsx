'use client';

import { useEffect, useState } from 'react';

import CreateServerModal from '@/components/modals/create-server-modal';
import InviteModal from '@/components/modals/invite-modal';
import EditServerModal from '@/components/modals/edit-server-modal';
import MembersModal from '../modals/members-modal';
import CreateChannleModal from '../modals/create-channel-modal';
import LeaveServerModal from '../modals/leave-server-modal';
import DeleteServerModal from '../modals/delete-server-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannleModal />
      <LeaveServerModal />
      <DeleteServerModal />
    </>
  );
};
