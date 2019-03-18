class FluidFile {
  constructor(name = '', rank = 0) {
    this.name = name;
    this.rank = rank;
    this.seen = false;
    this.children = [];
  }

  setChildren(children) {
    this.children = children;
  }
}

module.exports = FluidFile;
