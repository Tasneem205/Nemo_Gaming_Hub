/**
 * @param {number[][]} customers
 * @return {number}
 */
var averageWaitingTime = function(customers) {
    let waiting = 0, start = 0;
    start += customers[0][0];
    for (let i = 0; i < customers.length; i++) {
        console.log(customers[i][0] + ", " + customers[i][1]);
        console.log(start);
        if (start >= customers[i][0]) {
            waiting += (start - customers[i][0]);
        }
        waiting += customers[i][1];
        start += customers[i][1];
        console.log(start);
        console.log(waiting);
    }
    return waiting / customers.length;
};

// console.log(averageWaitingTime([[1,2],[2,5],[4,3]]) == 5.00);
// console.log(averageWaitingTime([[5,2],[5,4],[10,3],[20,1]]) == 3.25000);
console.log(averageWaitingTime([[2,3],[6,3],[7,5],[11,3],[15,2],[18,1]]) == 4.16667);