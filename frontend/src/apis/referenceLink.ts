import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

interface Link {
  id: string;
  url: string;
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
  accessCode: string;
  url: string;
}

export const addReferenceLink = async ({ accessCode, url }: AddReferenceLinkRequest) => {
  const response = await fetch(`${API_URL}/${accessCode}/reference-link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.ADD_REFERENCE_LINKS);
  }
};

interface DeleteReferenceLinkRequest {
  accessCode: string;
  id: string;
}

export const deleteReferenceLink = async ({ accessCode, id }: DeleteReferenceLinkRequest) => {
  const response = await fetcher.delete({ url: `${API_URL}/${accessCode}/reference-link/${id}`, errorMessage: '' });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.DELETE_REFERENCE_LINKS);
  }
};
