export class File {
  name: string;
  children: string[];

  constructor(name: string = '') {
    this.name = name;
    this.children = [];
  }
}
