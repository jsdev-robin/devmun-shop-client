'use client';

import React from 'react';
import { userAuthApi } from '../../lib/features/services/auth/authApi';
import Loading from '../loading';
import ApiError from '@repo/ui/components/api-error';

const Loader = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = userAuthApi.endpoints.getProfile.useQuery();

  if (isError) {
    return (
      <>
        <ApiError />
      </>
    );
  }

  return isLoading ? <Loading /> : children;
};

export default Loader;
