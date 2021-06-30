import { useEffect, useState } from 'react';
import { Notyf } from 'notyf';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setToast(new Notyf());
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return { toast, setToast };
};
