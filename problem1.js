const cache = (function () {
    let _InMemoryCache = {};
    let _limit = 3;

    return {

        get: function (key, defaultValue) {
            return _InMemoryCache[key] || defaultValue;
        },
        add: function (key, value) {
            let size = this.size()
            if (_InMemoryCache[key] !== undefined) {
                this._update(key, value)
                return 1

            } else {
                if (size >= _limit) {
                    return 'max limit'
                } else {
                    _InMemoryCache[key] = value
                    return 0
                }
            }


        },
        _update: (key, value) => {
            _InMemoryCache[key] = value

        },
        keys: function () {
            return Object.keys(_InMemoryCache);
        },
        clear: function () {

            let tmp = this.size()
            _InMemoryCache = {};
            return tmp

        },
        size: function () {
            return Object.keys(_InMemoryCache).length;
        }
    };

})();



console.log(cache.add('1', 'tes1'))
console.log(cache.add('2', 'tes2'))
console.log(cache.add('3', 'tes3'))
console.log(cache.add('2', 'tes2.1'))
console.log(cache.keys())
console.log(cache.add('4', 'tes4'))
console.log(cache.keys())
console.log(cache.get('2'))
console.log(cache.get('3'))
console.log(cache.get('1'))
console.log(cache.clear())
console.log(cache.keys())
