import { useEffect, useRef } from 'react';

export default function ImageCapture({ onCapture }) {
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      onCapture();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onCapture]);

  return null;
}