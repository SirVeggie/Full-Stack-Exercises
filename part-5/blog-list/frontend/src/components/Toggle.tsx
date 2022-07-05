import { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

type ToggleProps = {
  visible: boolean;
  children: React.ReactNode;
  animated?: boolean;
  span?: boolean;
};

export function Toggle({ visible, children, animated, span }: ToggleProps) {
  const s = useStyle();
  const [maxHeight, setMaxHeight] = useState(0);
  const [wait, setWait] = useState(true);
  const ref = useRef<any>();
  
  useEffect(() => {
    if (!animated)
      return;
    setMaxHeight(ref.current?.clientHeight ?? 0);
    setTimeout(() => {
      setWait(false);
    }, 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!animated) {
    return <>{visible ? children : null}</>;
  }

  const calc = () => {
    if (!maxHeight)
      return 'auto';
    if (visible || wait)
      return `${maxHeight}px`;
    return '0px';
  };

  const style = {
    '--height': calc(),
    '--opacity': visible ? 1 : 0,
  } as any;

  if (span) {
    return (
      <span className={s.div} style={style} ref={ref}>
        {children}
      </span>
    );
  }

  return (
    <div className={s.div} style={style} ref={ref}>
      {children}
    </div>
  );
}

const useStyle = createUseStyles({
  div: {
    overflow: 'hidden',
    transition: 'height 0.5s, opacity 0.5s',
    height: 'var(--height)',
    opacity: 'var(--opacity)',
  }
});