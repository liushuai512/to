let name = 'zfpx';
let age = 8;
let desc = "${name} is ${age} years old!";

function parse(str){
  return str.replace(/\${(\w+)}/g,function(){
      return eval(arguments[1]);
  });
}
// name is age years old
console.log(parse(desc));
console.log(eval('name+1'));
console.log(eval('age+1'));

let html = `<ul>
                <li>zfpx1</li>
                <li>zfpx2</li>
            </ul>`;
