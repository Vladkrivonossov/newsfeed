import React, { FC, HTMLAttributes, RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import throttle from 'lodash.throttle';
import './Dropdown.css';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { createFocusTrap } from 'focus-trap';

interface DropdownProps extends HTMLAttributes<HTMLElement> {
  targetRef: RefObject<HTMLElement>;
  shown: boolean;
  onShownChange: (shown: boolean) => void;
}

const calcCoords = (targetElement: HTMLElement) => {
  const rect = targetElement.getBoundingClientRect();

  return {
    top: window.scrollY + rect.bottom + 12,
    right: window.innerWidth - rect.right - window.scrollX,
  };
};

export const Dropdown: FC<DropdownProps> = ({
  targetRef,
  children,
  shown,
  onShownChange,
  style,
  className,
  ...restProps
}: DropdownProps) => {
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLDivElement, {
      allowOutsideClick: true,
    });

    if (shown) {
      trap.activate();
      setCoords(calcCoords(targetRef.current as HTMLElement));
    }

    return () => {
      trap.deactivate();
    };
  }, [shown]);

  useEffect(() => {
    onShownChange(shown);
  }, [shown, onShownChange]);

  useEffect(() => {
    const documentClickListener = () => {
      onShownChange(false);
    };

    const windowResizeListener = throttle(() => {
      setCoords(calcCoords(targetRef.current as HTMLElement));
    }, 30);

    if (shown) {
      document.addEventListener('click', documentClickListener);
      window.addEventListener('resize', windowResizeListener);
    }

    return () => {
      document.removeEventListener('click', documentClickListener);
      window.removeEventListener('resize', windowResizeListener);
    };
  }, [onShownChange, shown]);

  return createPortal(
    <CSSTransition in={shown} mountOnEnter unmountOnExit timeout={200} classNames="dropdown-animation">
      <div ref={ref} {...restProps} className={classNames('dropdown', className)} style={{ ...style, ...coords }}>
        {children}
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement
  );
};
