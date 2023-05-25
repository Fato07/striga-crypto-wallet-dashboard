import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/sign-up');
  }, []);

  return null;  // or a loading spinner if you want
};

export default IndexPage;
