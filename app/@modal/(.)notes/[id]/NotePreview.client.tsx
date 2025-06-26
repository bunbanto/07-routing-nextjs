'use client';

import { useParams } from 'next/navigation';
import NotePreview from '@/components/NotePreview/NotePreview';
import Modal from '@/components/Modal/Modal';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  return (
    <Modal>
      <NotePreview id={id} />
    </Modal>
  );
}
