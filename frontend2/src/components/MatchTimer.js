import { Progress } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

const MatchTimer = (props) => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 30);

  const { seconds, start } = useTimer({
    expiryTimestamp,
    onExpire: () => props.onMatchExpiry(),
  });

  useEffect(() => {
    start();
  }, []);

  return <Progress hasStripe value={((30 - seconds) / 30) * 100} />;
};

export default MatchTimer;
