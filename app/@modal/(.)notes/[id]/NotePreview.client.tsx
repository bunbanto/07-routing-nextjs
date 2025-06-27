'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import Loader from '@/components/Loader/Loader';
import { getNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

export default function NoteDetailsClient() {
  const { id: numId } = useParams<{ id: string }>();
  const router = useRouter();

  const id = Number(numId);
  const handleClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(Number(id)),
  });

  return (
    <Modal onClose={handleClose}>
      {isLoading && <Loader />}
      {error && <p>Error loading note</p>}
      {note && <NotePreview id={id.toString()} />}
    </Modal>
  );
}
