class HashMap {
  constructor () {
    this.capacity = 16;
    this.buckets = [];
    this.loadFactor = 0.75;
  }

  hash (key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  set (key, value) {
    let index = this.hash(key) % this.capacity;
    this.buckets[index] = { [key] : value };

    // todo: buckets grow logic
    // todo: check if key exists
  }

  get (key) {
    let index = this.hash(key) % this.capacity;
    return this.buckets[index] || null;
  }

  has (key) {
    let index = this.hash(key) % this.capacity;
    // return Object.hasOwn(this.buckets[index], key);
    if (this.buckets[index] !== undefined) {
      return Object.hasOwn(this.buckets[index], key);
    }
    return false;
  }

  remove (key) {
    let index = this.hash(key) %  this.capacity;
    if (this.has(key)) {
      this.buckets[index] = null;
      return true;
    }
    return false;
  }

  length () {
    let counter = this.buckets.reduce((total, node) => {
      if (node !== null && node !== undefined) {
        return total + 1;
      }
    }, 0);
    return counter;
  }

  clear () {
    this.buckets = [];
  }

  keys () {
    let keys = this.buckets.reduce((allKeys, node) => {
      if (node !== null && node !== undefined) {
        return [...allKeys, Object.keys(node)[0]];
      }
    }, []);
    return keys;
  }

  values () {
    let values = this.buckets.reduce((allValues, node) => {
      if (node !== null && node !== undefined) {
        return [...allValues, node[Object.keys(node)]];
      }
    }, []);
    return values;
  }

  entries () {
    let string = '[ ';
    this.buckets.forEach((node) => {
      if (node !== undefined && node !== null) {
        let key = Object.keys(node)[0];
        string += `[ ${ key }, ${ node[key] } ], `;
      }
    });
    string += ']';
    return string;
  }
}
