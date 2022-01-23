import { environment } from "@env";

export class ApiService {

  constructor(
    protected uri: string
  ) { }

  protected getUrl(branch?: string | number): string {
    let url = `https://app.garyshker-app.kz/${this.uri}`;

    if (branch) {
      url += `/${branch}`;
    }

    return `${url}/`;
  }
  protected getNoSlashUrl(branch?: string | number): string {
    let url = `https://app.garyshker-app.kz/${this.uri}`;

    if (branch) {
      url += `/${branch}`;
    }

    return `${url}`;
  }
}
