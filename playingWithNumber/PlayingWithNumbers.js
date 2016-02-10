function processData(input) {
    var inputArray = input.split("\n");
    var nList = inputArray[1].split(" ").map(Number).sort(function(a,b){return a-b;});
    // console.log(nList);
    var qList = inputArray[3].split(" ").map(Number);
    // console.log(qList);
    process.stdout.write(cal(nList, qList).join("\n"));
}

function cal(nList, qList) {
    var sum = nList.reduce(function(a,b){return Math.abs(a)+Math.abs(b);});
    // console.log("sum:" + sum);
    var resultList=[];
    var head = findZero(nList, 0);
    var currentPlus = 0;
    // console.log("head:" + head);
    qList.map(function(qElem, index){
        currentPlus+=qElem;
        var currentHead = findZero(nList, currentPlus);
        // console.log("index:" + index);
        // console.log("currentPlus:" + currentPlus);
        // console.log("currentHead:" + currentHead);
        var left = head <= currentHead ? head : currentHead;
        // console.log("left:" + left);
        var right = head >= currentHead ? head : currentHead;
        // console.log("right:" + right);
        var resultSum = sum + (nList.length - right - left)*currentPlus;
        // console.log("resultSum:" + resultSum);
        for(var i = left ; i<right ; i++){
            resultSum += (Math.abs(currentPlus+nList[i]) - Math.abs(nList[i]));
        }
        // console.log("resultSum:" + resultSum);
        resultList[index]=resultSum;
        // console.log("\n");
    });
    return resultList;
}

function findZero(nList, num){
    var head = 0;
    var end = nList.length-1;
    var currentIndex;
    while(head <= end){
        currentIndex = (head+end)/2|0;
        if(nList[currentIndex]+num >= 0 && nList[currentIndex-1]+num < 0 || currentIndex == head){
            return currentIndex;
        } else if(nList[currentIndex]+num < 0){
            head = currentIndex + 1;
        } else if(nList[currentIndex]+num >= 0 && nList[currentIndex-1]+num >= 0){
            end = currentIndex - 1 ;
        }
    }
    return currentIndex;
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
