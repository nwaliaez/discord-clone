'use client';
import { FC, useState } from 'react';
import axios from 'axios';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/hooks/user-modal-store';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';

interface inviteModalProps {}

const InviteModal: FC<inviteModalProps> = ({}) => {
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === 'invite';
    const { server } = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(
                `/api/servers/${server?.id}/invite-code`
            );
            onOpen('invite', { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button
                            disabled={isLoading}
                            onClick={onCopy}
                            size="icon"
                        >
                            {copied ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    <Button
                        disabled={isLoading}
                        onClick={onNew}
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InviteModal;
