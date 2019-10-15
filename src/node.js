class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = this.left = this.right = null;
  }

  appendChild(node) {
    if (!this.left) {
      this.left = node;
      node.parent = this;
    }
    else if (!this.right) {
      this.right = node;
      node.parent = this;
    }
  }

  removeChild(node) {
    if (this.left === node) this.left.parent = this.left = null;
    else if (this.right === node) this.right.parent = this.right = null;
    else throw new Error();
  }

  remove() {
    if (this.parent) this.parent.removeChild(this);
  }
  swapWithParent() {
    if (!this.parent) return;

    if (this.parent.parent)
      this.parent.parent.left === this.parent ? this.parent.parent.left = this : this.parent.parent.right = this;

    const parentLeft = this.parent.left;
    const parentRight = this.parent.right;

    this.parent.left = this.left;
    this.parent.right = this.right;

    if (this.left) {
      this.left.parent = this.parent;

      if (this.right) {
        this.right.parent = this.parent;
      }
    }

    if (parentLeft === this) {
      this.left = this.parent;

      if (parentRight) {
        this.right = parentRight;
        this.right.parent = this;
      }
    } else if (parentRight === this) {
      this.right = this.parent;

      if (parentLeft) {
        this.left = parentLeft;
        this.left.parent = this;
      }
    }

    [this.parent.parent, this.parent] = [this, this.parent.parent];
  }
}

module.exports = Node;
