const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
  }

  push(data, priority) {
    const node = new Node(data, priority);

    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    if (this.isEmpty()) return;

    const detached = this.detachRoot();

    this.restoreRootFromLastInsertedNode(detached);
    this.shiftNodeDown(this.root);

    return detached.data;
  }

  detachRoot() {
    const root = this.root;
    const rootIndex = this.parentNodes.indexOf(root);

    this.root = null;

    if (rootIndex !== -1) {
      this.parentNodes.shift();
    }

    return root;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (this.isEmpty()) return;

    const lastNodeIndex = this.parentNodes.length - 1;
    this.root = this.parentNodes[lastNodeIndex];

    if (this.root.parent !== detached) {
      this.root.left = detached.left;
      this.root.right = detached.right;
      detached.left.parent = this.root;
      detached.right.parent = this.root;

      if (this.root.parent.right) this.parentNodes.unshift(this.root.parent);
      this.parentNodes.pop();
    } else {
      if (this.root.parent.right === this.root) {
        this.root.left = detached.left;
        this.root.right = null;
        detached.left.parent = this.root;

        this.parentNodes.pop();
        this.parentNodes.unshift(this.root);
      } else {
        this.root.left = this.root.right = null;
      }
    }

    this.root.remove();
    this.root.parent = null;
  }

  size() {
    if (this.isEmpty()) return 0;

    let height = 1;
    let current = this.parentNodes[0];

    while (current.parent) {
      height *= 2;
      current = current.parent;
    }

    return height - 1 + this.parentNodes.length;
  }


  isEmpty() {
    return !this.root && !this.parentNodes.length;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
  }

  insertNode(node) {
    if (this.isEmpty()) {
      this.root = node;
      this.parentNodes.push(node);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);

      if (this.parentNodes[0].left && this.parentNodes[0].right)
        this.parentNodes.shift();
    }
  }

  shiftNodeUp(node) {
    if (!node.parent) this.root = node;
    else if (node.priority > node.parent.priority) {
      const nodeIndex = this.parentNodes.indexOf(node);

      if (nodeIndex !== -1) {
        const parentIndex = this.parentNodes.indexOf(node.parent);

        this.parentNodes[nodeIndex] = node.parent;

        if (parentIndex !== -1) this.parentNodes[parentIndex] = node;
      }

      node.swapWithParent();

      this.shiftNodeUp(node);
    }
  }

  shiftNodeDown(node) {
    if (this.isEmpty()) return;

    if (node.left && node.priority < node.left.priority) {
      let child = !node.right ? node.left : node.right.priority > node.left.priority ? node.right : node.left;

      const childIndex = this.parentNodes.indexOf(child);

      if (childIndex !== -1) {
        const nodeIndex = this.parentNodes.indexOf(node);

        this.parentNodes[childIndex] = node;

        if (nodeIndex !== -1) this.parentNodes[nodeIndex] = child;
      }

      child.swapWithParent();

      if (!child.parent) this.root = child;

      this.shiftNodeDown(node);
    }
  }
}

module.exports = MaxHeap;
