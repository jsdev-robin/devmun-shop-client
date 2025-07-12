'use client';

import React from 'react';
import { userAuthApi } from '../../lib/features/services/auth/authApi';
import Loading from '../loading';
import ApiError from '@repo/ui/components/api-error';

const Loader = ({ children }: { children: React.ReactNode }) => {
  const profile = userAuthApi.endpoints.getProfile.useQuery();
  // const [triggerRefresh] = userAuthApi.endpoints.refreshToken.useMutation();

  // useEffect(() => {
  //   const refreshPromise = triggerRefresh();
  //   return () => {
  //     refreshPromise.abort();
  //   };
  // }, [triggerRefresh]);

  if (profile.isError) {
    return <ApiError />;
  }

  return profile.isLoading ? <Loading /> : children;
};

export default Loader;
