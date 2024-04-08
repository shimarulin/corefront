import { execaCommand } from 'execa'
import { assocPath, split } from 'ramda'

export interface GitUser {
  name: string;
  email: string;
}

export interface GitConfig {
  user: GitUser;
  remote?: {
    origin: {
      url: string;
      fetch: string;
    };
  };
  [key: string]: unknown;
}

export const getGitConfig = async (cwd: string | URL = process.cwd()): Promise<GitConfig> => {
  const { stdout } = await execaCommand('git config -l', {
    cwd,
  })

  const cfg: GitConfig = {
    user: {
      name: '',
      email: '',
    },
  }

  return stdout
    .trim()
    .split('\n')
    .map((str) => str.split('='))
    .reduce((acc, [
      path,
      value,
    ]) => assocPath(split('.', path), value, acc), cfg)
}
