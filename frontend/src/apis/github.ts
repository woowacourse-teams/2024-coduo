import { Octokit } from '@octokit/rest';
import * as Sentry from '@sentry/react';

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH,
});

const CODUO_ORGANIZATION = 'coduo-missions';

export const getSHAforMain = async (repositoryName: string) => {
  try {
    const response = await octokit.request(`GET /repos/${CODUO_ORGANIZATION}/${repositoryName}/git/refs/heads/main`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return response.data.object.sha;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    Sentry.captureException(error);
  }
};

interface CreateBranchProps {
  repositoryName: string;
  branchName: string;
  sha: string;
}

export const createBranch = async ({ repositoryName, branchName, sha }: CreateBranchProps) => {
  try {
    const result = await octokit.request(`POST /repos/${CODUO_ORGANIZATION}/${repositoryName}/git/refs`, {
      ref: `refs/heads/${branchName}`,
      sha: sha,
    });
    return result;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    Sentry.captureException(error);
  }
};

export const getRepositories = async () => {
  try {
    const response = await octokit.request(`GET /orgs/${CODUO_ORGANIZATION}/repos`, {
      org: 'ORG',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    Sentry.captureException(error);
  }
};

export const getBranches = async (repositoryName: string) => {
  try {
    const response = await octokit.request(`GET /repos/${CODUO_ORGANIZATION}/${repositoryName}/branches`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    Sentry.captureException(error);
  }
};
