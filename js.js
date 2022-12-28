const { authenticate } = require("passport");
const { Strategy } = require("passport-local");

function introduce (lastName, firstName, callback) {
   var fullName = lastName + firstName;
   
   other(callback)
}

function other(callback) {
   callback();
}

introduce("홍", "길동", (name)=> {
   console.log(name);
});
// 결과 -> 홍길동

const authenticate = (strategy, callback) => {

   callback();

}