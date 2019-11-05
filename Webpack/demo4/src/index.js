import _ from 'lodash';
import './style.css'
import logo from './img/logo.png'
//json-loader是默认包含的，可以直接引用json文件
import jsonDate from './my.json'


function component() {
    var element = document.createElement('div');

    // Lodash，现在由此脚本导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // 将图像添加到我们现有的 div。
    var myLogo=new Image();
    myLogo.src=logo;
    element.appendChild(myLogo);

    console.log(jsonDate);

    return element;
}

document.body.appendChild(component());
