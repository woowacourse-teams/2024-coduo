import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export interface Link {
  id: number;
  url: string;
  headTitle: string;
  openGraphTitle: string;
  description: string;
  image: string;
}

interface GetReferenceLinksRequest {
  accessCode: string;
}

export const getReferenceLinks = async ({ accessCode }: GetReferenceLinksRequest): Promise<Link[]> => {
  const response = await fetcher.get({
    url: `${API_URL}/${accessCode}/reference-link`,
    errorMessage: ERROR_MESSAGES.GET_REFERENCE_LINKS,
  });

  return await response.json();
};

interface AddReferenceLinkRequest {
  url: string;
  accessCode: string;
}

export const addReferenceLink = async ({ url, accessCode }: AddReferenceLinkRequest) => {
  await fetcher.post({
    url: `${API_URL}/${accessCode}/reference-link`,
    body: JSON.stringify({ url }),
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
