// 类与继承
// function Animal(name) {
//   this.name = name;
// }
// Animal.prototype.showName = function() {
//   console.log(this.name);
// };
// var a = new Animal('tom');
// a.showName();
// var a1 = new Animal('jerry');
// a1.showName();
// --------------------------
// es6语法
class Animal {
  // 静态方法
  static showInfo() {
    console.log('hi');
  }
  // 构造函数
  constructor(name) {
    this.name = name;
  }
  // 方法
  showName() {
    console.log(this.name);
  }
}
// 实例化
// let a = new Animal('spike');
// a.showName();
// Animal.showInfo();
// --------------
// 类的继承extends
class Dog extends Animal {
  constructor(name, color) {
    super(name); //super用来调用父级
    this.color = color;
  }
  showColor() {
    console.log(this.color);
  }
}
let d = new Dog('doudou', 'tellow');
d.showName();
d.showColor();
Dog.showInfo();
