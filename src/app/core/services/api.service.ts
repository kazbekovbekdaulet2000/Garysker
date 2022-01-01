import { environment } from "@env";

export class ApiService {

  constructor(
    protected uri: string
  ) {}

  protected getUrl(branch?: string | number): string {
    let url = `${environment.API}/${this.uri}`;

    if (branch) {
      url += `/${branch}`;
    }

    return `${url}/`;
  }

  protected noSlashUrl(branch?: string | number): string {
    let url = `${environment.API}/${this.uri}`;

    if (branch) {
      url += `/${branch}`;
    }

    return `${url}`;
  }
}