export class FluidFile {
  name: string;
  rank: number;
  wasSeen: boolean;
  isUnresolved: boolean;
  isResolved: boolean;
  children: string[];

  constructor(name = '', rank = 0) {
    this.name = name;
    this.rank = rank;
    this.wasSeen = false;
    this.isUnresolved = false;
    this.isResolved = false;
    this.children = [];
  }
}