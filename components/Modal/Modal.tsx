import css from './Modal.module.css';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface ModalProps {
  onClose?: () => void;
  GoBack?: boolean;
  children?: React.ReactNode;
}

export default function Modal({
  onClose,
  GoBack = false,
  children,
}: ModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    onClose?.();
    if (GoBack) {
      router.back();
    }
  }, [onClose, GoBack, router]);

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

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement;
    const modal = document.querySelector('[role="dialog"]') as HTMLElement;
    modal?.focus();
    return () => {
      previouslyFocused?.focus();
    };
  }, []);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackDropClick}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
