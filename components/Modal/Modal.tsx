import css from './Modal.module.css';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface NoteModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
}

export default function NoteModal({ onClose, children }: NoteModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    onClose?.();
    router.back();
  }, [onClose, router]);

  const handleBackDropClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (evt.target === evt.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    function handleEscKey(evt: KeyboardEvent) {
      if (evt.code === 'Escape') {
        handleClose();
      }
    }
    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackDropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
