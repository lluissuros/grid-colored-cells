import { useState, useEffect } from "react";

export default function useDisableFastSingleClicks(
  onSingleClick = () => {},
  onDoubleClick = () => {},
  minimum_interval_ms = 300
) {
  const [last2ClickTimes, setLast2ClickTimes] = useState([]);

  useEffect(() => {
    if (last2ClickTimes.length === 0) {
      return; //init
    }
    if (last2ClickTimes.length === 1) {
      onSingleClick();
      return;
    }
    if (last2ClickTimes[1] - last2ClickTimes[0] > minimum_interval_ms) {
      onSingleClick();
    } else {
      onDoubleClick();
    }
  }, [last2ClickTimes, minimum_interval_ms, onDoubleClick, onSingleClick]);

  const onNewClick = newTime => {
    const new2LastTimes =
      last2ClickTimes.length > 1
        ? last2ClickTimes.slice(last2ClickTimes.length - 1).concat(newTime)
        : last2ClickTimes.concat(newTime);
    setLast2ClickTimes(new2LastTimes);
  };

  return () => onNewClick(Date.now());
}
