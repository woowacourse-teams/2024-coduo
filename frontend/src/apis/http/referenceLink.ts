import fetcher from '@/apis/http/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export interface Reference {
  id: number;
  url: string;
  headTitle: string;
  openGraphTitle: string;
  description: string;
  image: string;
  categoryName: string;
  categoryId: number;
}

interface GetReferenceLinksRequest {
  accessCode: string;
  categoryId: string;
}

export const getReferenceLinks = async ({ accessCode, categoryId }: GetReferenceLinksRequest): Promise<Reference[]> => {
  const categoryParamsUrl = categoryId === '0' ? `` : `?categoryId=${categoryId}`;

  const response = await fetcher.get({
    url: `${API_URL}/${accessCode}/reference-link${categoryParamsUrl}`,
    errorMessage: ERROR_MESSAGES.GET_REFERENCE_LINKS,
  });

  return await response.json();
};
