import { useState, useEffect, useCallback } from "react";

export default function useShortOrLongPress(
  shortPressCallback = () => {},
  longPressCallback = () => {},
  ms = 1000
) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(longPressCallback, ms);
    } else {
      shortPressCallback();
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [longPressCallback, shortPressCallback, ms, startLongPress]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop
  };
}
