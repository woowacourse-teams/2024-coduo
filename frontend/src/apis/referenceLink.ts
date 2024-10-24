import fetcher from '@/apis/fetcher';

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

interface AddReferenceLinkRequest {
  url: string;
  accessCode: string;
  categoryId: string | null;
}

export const addReferenceLink = async ({ url, accessCode, categoryId }: AddReferenceLinkRequest) => {
  await fetcher.post({
    url: `${API_URL}/${accessCode}/reference-link`,
    body: JSON.stringify({ url, categoryId }),
    errorMessage: ERROR_MESSAGES.ADD_REFERENCE_LINKS,
  });
};

interface DeleteReferenceLinkRequest {
  id: number;
  accessCode: string;
}

export const deleteReferenceLink = async ({ id, accessCode }: DeleteReferenceLinkRequest) => {
  await fetcher.delete({
    url: `${API_URL}/${accessCode}/reference-link/${id}`,
    errorMessage: ERROR_MESSAGES.DELETE_REFERENCE_LINKS,
  });
};
