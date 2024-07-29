import fetcher from '@/apis/fetcher';

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
    errorMessage: '레퍼런스 링크 불러오기에 실패했습니다.',
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
    throw new Error('레퍼런스 링크 저장에 실패했습니다.');
  }
};
