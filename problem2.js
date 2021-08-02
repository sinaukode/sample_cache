class Node {
    constructor(key, value, next = null, prev = null) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}


const cacheLRU = function(capacity) {
    this.size = 0;
    this.limit = capacity;
    this.cache = {};
    this.head = null;
    this.tail = null;
};



cacheLRU.prototype.get = function(key) {

    if(this.cache[key]){
        const value = this.cache[key].value;

        this.remove(key)

        this.add(key, value);

        return value;
    }
    return -1;
};


cacheLRU.prototype.add = function(key, value) {

    // console.log(`\n- - key ${key} - -`)

    if(!this.head){
        //key 1

        this.head = this.tail = new Node(key, value);
    }else{

        const node = new Node(key, value, this.head);
        this.head.prev = node;
        this.head = node;
    }

    if(this.cache[key]){

        this.remove(key);
        this.cache[key] = this.head;
        this.size++;
        return 1
    }else{

        this.checkLimit();
        this.cache[key] = this.head;
        this.size++;
        return 0
    }


    // console.log(`===== last ======`)
    // console.log(this.head)
    // console.log(this.tail)
    // console.log(`\n\n`)

};

cacheLRU.prototype.checkLimit = function() {
    if(this.size == this.limit){
        this.remove(this.tail.key);
    }
};

cacheLRU.prototype.remove = function(key) {
    const node = this.cache[key];
    // console.log(node)
    if(node == undefined) return;


    if(node.prev !== null){
        node.prev.next = node.next;
    }else{
        this.head = node.next;
    }

    if(node.next !== null){
        node.next.prev = node.prev;
    }else{
        this.tail = node.prev
    }

    delete this.cache[key];
    this.size--;
};

cacheLRU.prototype.keys = function() {

    return Object.keys(this.cache);
}



cacheLRU.prototype.clear = function() {

    let tmp =  this.size
    this.cache = {};

    return tmp

}





let cacheData = new cacheLRU(3)

console.log(cacheData.add('1', 'tes1'))
console.log(cacheData.add('2', 'tes2'))
console.log(cacheData.add('3', 'tes3'))
console.log(cacheData.add('2', 'tes2.1'))
console.log(cacheData.keys())
console.log(cacheData.add('4', 'tes4'))
console.log(cacheData.keys())
console.log(cacheData.get('2'))
console.log(cacheData.get('3'))
console.log(cacheData.get('1'))
console.log(cacheData.clear())
console.log(cacheData.keys())
