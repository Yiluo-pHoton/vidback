var svm = require('node-svm');
var xor_model = require('./xor.json');

var xor = [
    [[0, 0], 0],
    [[0, 1], 1],
    [[1, 0], 1],
    [[1, 1], 0]
];

var clf = svm.restore(xor_model);
xor.forEach(function(ex){
    var prediction = clf.predictSync(ex[0]);
    console.log('%d XOR %d => %d', ex[0][0], ex[0][1], prediction);
});
