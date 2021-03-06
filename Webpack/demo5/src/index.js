import _ from 'lodash';
import printMe from './print.js'

function component() {
    var element = document.createElement('div');
    var btn=document.createElement('button');

    // Lodash，现在由此脚本导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML='CLICK ME';
    btn.onclick=printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());

if(module.hot){
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}
