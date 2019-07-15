var template = require('art-template');
// var html = template(__dirname + '/artTemplate.art', {
//   user: {
//     name: 'aui'
//   }
// });
// ------------------------------------------
// let tpl = '<ul>{{each list value index}}<li>{{value}}</li>{{/each}}</ul>';
// let render = template.compile(tpl);
// let ret = render({
//   list: ['orange', 'banana', 'apple']
// });
// ------------------------------------------
// let ret = template.render(tpl, {
//   list: ['orange', 'banana']
// });
// console.log(ret);
var html = template(__dirname + '/artTemplate.art', {
  chinese: '120',
  math: '130',
  english: '140',
  summery: '150'
});
console.log(html);
