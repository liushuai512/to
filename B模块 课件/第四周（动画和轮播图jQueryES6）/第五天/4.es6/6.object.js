let name = 'zfpx';
let age = 8;
let obj = {
    name,
    age,
    getName(){
        console.log(this.name);
    }
}