import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { useRouter } from "next/router";
const useUser = (redirectUrl?: string) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null | {}>({});
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    setUser({});
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (redirectUrl) {
          router.replace(redirectUrl);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, [auth]);

  return {
    user,
    loading,
  };
};

export default useUser;
