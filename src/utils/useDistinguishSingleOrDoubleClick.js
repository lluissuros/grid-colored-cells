import { useState } from "react";

export default function useDistinguishSingleOrDoubleClick(
  onSingleClick = () => {},
  onDoubleClick = () => {},
  minimum_interval_ms = 300
) {
  const [last2ClickTimes, setLast2ClickTimes] = useState([Date.now()]);
  const [timerId, setTimerId] = useState(0);

  const onNewClick = newTime => {
    const new2LastTimes =
      last2ClickTimes.length > 1
        ? last2ClickTimes.slice(last2ClickTimes.length - 1).concat(newTime)
        : last2ClickTimes.concat(newTime);

    const [previousClickTime, currentClickTime] = new2LastTimes;
    if (currentClickTime - previousClickTime < minimum_interval_ms) {
      clearTimeout(timerId);
      onDoubleClick();
    } else {
      const singleClickTimerId = setTimeout(() => {
        onSingleClick();
      }, minimum_interval_ms);
      setTimerId(singleClickTimerId);
    }
    setLast2ClickTimes(new2LastTimes);
  };

  return () => onNewClick(Date.now());
}
