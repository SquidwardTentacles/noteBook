// exports.word = function() {
//   console.log('hello word');
// };
function hello() {
  var name = '';
  this.setName = function(setname) {
    name = setname;
  };
  this.sayHello = function() {
    console.log('hello' + name);
  };
}

module.exports = hello;
