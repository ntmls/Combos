var range = function(begin, end) {
    var result = [];
    for(var i=begin; i<=end; i++) {
        result.push(i);
    }
    return result;
};

var zip = function(list1, list2, f) {
    var len1 = list1.length;
    var len2 = list2.length;
    var maxLen = Math.max(len1,len2);
    var result = [];
    for (var i=0; i<maxLen; i++) {
        result.push(f(list1[i], list2[i]));
    }
    return result;
};

var areArraysEqual = function(list1, list2) {
    var equals = zip(list1, list2, (x,y) => x === y);
    var unequal = equals.filter(x => !x);
    return unequal.length === 0;
};

var removeItem = function(index, array) {
    var result = [];
    var count = 0;
    var len = array.length;
    for (var i=0; i<len; i++) {
        if (i != index) {
            result[count] = array[i];
            count += 1;
        }
    }
    return result;
};

var expand = function(template) {
    var cols = template.length;
    var colRange = range(0, cols-1);
    var indicesToValues = function(indices) {
        return colRange.map(x => template[x][indices[x]]);
    };
    var result = [];
    var minIndices = colRange.map(x => 0); 
    var maxIndices = colRange.map(x => template[x].length - 1); 
    var current = minIndices.concat(); //clone
    result.push(indicesToValues(minIndices));
    while (!areArraysEqual(current, maxIndices)) {
        current = current.concat();
        var i = 0;
        var carry = 1;
        while(carry === 1 || i > cols) {
            current[i] += 1;
            if (current[i] < template[i].length) {
                carry = 0;
            } else {
                current[i] = 0;
                carry = 1;
            }
            i += 1;
        }
        result.push(indicesToValues(current));
    }
    return result;
};

var permutations = function(list) {
    var len = list.length;
    var results = [];
    if (len === 1) {
        return list;
    } else {
        for (var i=0; i<len; i++) {
            var value = list[i];
            var next = removeItem(i, list);
            var perms = permutations(next);
            var jlen = perms.length;
            for (var j=0; j<jlen; j++) {
                var result = [value];
                result = result.concat(perms[j]);
                results.push(result);
            }
        }
        return results;
    }
    
};

var vals = [true, false];
var template = range(1,8).map((x)=>vals);
console.log(template);
var possible = expand(template);
console.log(possible);
console.log('Possible States: ' + possible.length);

var invariant = function(row) {
    return row.filter(x=>x).length === 5;
}

var validStates = possible.filter(invariant);
console.log(validStates);
console.log('Valid States: ' + validStates.length);

var nums = [1,2,3];
var nums2 = permutations(nums);
console.log(nums2);
