import fetcher from '@/apis/fetcher';

const baseURL = 'http://localhost:3000';

export const fetchReferenceLink = async () => {
  const response = await fetcher.get({
    url: `${baseURL}/reference-link`,
    errorMessage: '레퍼런스 링크 불러오기에 실패했습니다.',
  });
  const pairRoomCode = await response.json();

  return pairRoomCode;
};

interface AddReferenceLinkRequest {
  url: string;
}
export const addReferenceLink = async ({ url }: AddReferenceLinkRequest) => {
  const response = await fetcher.post({
    url: `${baseURL}/reference-link`,
    body: { url },
    errorMessage: '레퍼런스 링크 추가에 실패했습니다.',
  });
  const pairRoomCode = await response.json();

  return pairRoomCode;
};
