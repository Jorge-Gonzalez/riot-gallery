import { trhottle } from './utils'

let clientWidth = window.document.documentElement.clientWidth;
let clientHeight = window.document.documentElement.clientHeight;

const function resize (ev) {

}

window.addEventListener('resize', trhottle(resize, 200));
