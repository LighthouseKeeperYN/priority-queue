const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
    this.maxSize = maxSize;
    this.heap = new MaxHeap;
	}

	push(data, priority) {
    this.heap.push(data, priority);
    if (this.heap.size() > this.maxSize) throw new Error();
	}

	shift() {
    if (this.heap.isEmpty()) throw new Error();
    return this.heap.pop()
	}

	size() {
    return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
