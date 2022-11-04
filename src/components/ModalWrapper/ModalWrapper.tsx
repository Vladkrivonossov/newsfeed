import React, { FC, HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import './ModalWrapper.css';
import { CSSTransition } from 'react-transition-group';
import { createFocusTrap } from 'focus-trap';

interface ModalWrapperProps extends HTMLAttributes<HTMLElement> {
  alignX?: 'start' | 'center' | 'end';
  alignY?: 'start' | 'center' | 'end';
  className?: string;
  onClose: VoidFunction;
  children: ReactNode;
  shown: boolean;
}

export const MODAL_LABEL_ID = 'modal-label-id';
export const MODAL_DESCRIPTION_ID = 'modal-description-id';

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  alignX = 'center',
  alignY = 'center',
  className,
  onClose,
  shown,
  ...restProps
}: ModalWrapperProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLDivElement, {
      allowOutsideClick: true,
    });

    if (shown) {
      trap.activate();
      document.documentElement.classList.add('--prevent-scroll');
    }

    return () => {
      trap.deactivate();
      document.documentElement.classList.remove('--prevent-scroll');
    };
  }, [shown]);

  useEffect(() => {
    const documentKeyDownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', documentKeyDownListener);

    return () => {
      document.removeEventListener('keydown', documentKeyDownListener);
    };
  }, [onClose]);

  return createPortal(
    <CSSTransition in={shown} mountOnEnter unmountOnExit timeout={300} classNames="modal-wrapper-animation">
      <div
        className={classNames(
          'modal-wrapper',
          `modal-wrapper--alignY-${alignY}`,
          `modal-wrapper--alignX-${alignX}`,
          className
        )}
        onClick={onClose}
        {...restProps}
        role="dialog"
        aria-labelledby={MODAL_LABEL_ID}
        aria-describedby={MODAL_DESCRIPTION_ID}
      >
        <div
          ref={ref}
          className="modal-wrapper__children"
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement
  );
};
