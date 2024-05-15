// import React, { useState, useEffect } from "react";

// interface TimeLeft {
//     minutes: string | number;
//     seconds: string | number;
//   }
  
//   interface Props {
//     expiryTime: number;
//     visible: boolean;
//     onExpiry: () => void;
//   }

// const OTPTimer:React.FC<Props> = ({ expiryTime, visible, onExpiry }) => {
//   const calculateTimeLeft = (): TimeLeft  => {
//     const difference = expiryTime - Date.now();
//     let timeLeft: TimeLeft = {
//         minutes: 0,
//         seconds: 0,
//       };

//     if (difference > 0) {
//       const minutes = Math.floor((difference / 1000 / 60) % 60);
//       const seconds = Math.floor((difference / 1000) % 60);
//       timeLeft = {
//         minutes: minutes < 10 ? `0${minutes}` : minutes,
//         seconds: seconds < 10 ? `0${seconds}` : seconds,
//       };
//     } else {
//       onExpiry(); // Notify parent component when timer expires
//     }

//     return timeLeft;
//   };

//   const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

//   useEffect(() => {
//     if (!visible) return; // Do not start the timer if it's not visible

//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearTimeout(timer);
//   });

//   return (
//     <div className="flex justify-center items-center space-x-2">
//       {visible && (
//         <span className="text-xl text-black font-medium">
//           {timeLeft.minutes}:{timeLeft.seconds}
//         </span>
//       )}
//     </div>
//   );
// };

// export default OTPTimer;

import React, { useState, useEffect } from "react";

interface TimeLeft {
  minutes: string | number;
  seconds: string | number;
}

interface Props {
  expiryTime: number;
  visible: boolean;
  onExpiry: () => void;
}

const OTPTimer: React.FC<Props> = React.memo(({ expiryTime, visible, onExpiry }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = expiryTime - Date.now();
    if (difference <= 0) {
      onExpiry();
      return { minutes: 0, seconds: 0 };
    }
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return {
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible) {
      // Start the timer only when visible prop is true
      timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    } else {
      // Clear the timer when the component is not visible
      clearInterval(timer);
    }

    // Cleanup function to clear the interval
    return () => clearInterval(timer);
  }, [visible, expiryTime, onExpiry]);

  return (
    <div className="flex justify-center items-center space-x-2">
      {visible && (
        <span className="text-xl text-black font-medium">
          {timeLeft.minutes}:{timeLeft.seconds}
        </span>
      )}
    </div>
  );
});

export default OTPTimer;




