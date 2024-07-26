import fetcher from '@/apis/fetcher';

const API_URL = process.env.REACT_APP_API_URL;

interface Link {
  id: string;
  url: string;
}

export const getReferenceLinks = async (): Promise<Link[]> => {
  const response = await fetcher.get({
    url: `${API_URL}/reference-link`,
    errorMessage: '레퍼런스 링크 불러오기에 실패했습니다.',
  });

  return await response.json();
};

interface AddReferenceLinkRequest {
  url: string;
}

export const addReferenceLink = async ({ url }: AddReferenceLinkRequest) => {
  const response = await fetch(`${API_URL}/reference-link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('레퍼런스 링크 저장에 실패했습니다.');
  }

  const data = await response.json();

  return data.accessCode;
};
