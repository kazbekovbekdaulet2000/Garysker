import { environment } from "@env";

export class ApiService {

  constructor(
    protected uri: string | null
  ) { }

  protected getUrl(branch?: string | number): string {
    let url = `${environment.API}/${this.uri}`;

    if (branch) {
      url += `/${branch}`;
    }

    return `${url}/`;
  }
  protected getNoSlashUrl(branch?: string | number): string {
    let url = `${environment.API}/${this.uri}`;

    if (branch) {
      url += `/${branch}`;
    }

    return `${url}`;
  }
}
