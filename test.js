var finishPos = 21;
var finishReason = 'Finished ' + finishPos;

switch (finishPos % 10) {
    case 1:
        finishReason += 'st';
        break;
    case 2:
        finishReason += 'nd';
        break;
    case 3:
        finishReason += 'rd';
        break;
    default:
        finishReason += 'th';
        break;
}

console.log(finishReason);