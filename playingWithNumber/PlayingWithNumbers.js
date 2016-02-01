function processData(input) {
    var inputArray = input.split("\n");
    var nList = inputArray[1].split(" ").map(Number).sort();
    var qList = inputArray[3].split(" ").map(Number).sort();
    process.stdout.write(cal(nList, qList).join("\n"));
}

function cal(nList, qList) {
    var resultList=[];
    qList.map(function(qElem, index){
        var sum = 0;
        nList.map(function(nElem, index){
            nList[index] = nElem += qElem;
            sum = nElem > 0 ? sum + nElem : sum - nElem;
        });
        resultList[index]=sum;
    });
    return resultList;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});
