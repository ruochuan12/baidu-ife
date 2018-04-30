import san from 'san';
// import App from '../components/demo';

// console.log(App.template, 'template');
// let myApp = new App();
// myApp.attach(document.getElementById('app'));
import styles from '../styles/index.css';

var MyApp = san.defineComponent({
    template: `<ul><li san-for="item in list">{{item}}</li></ul>`,
    attached: function () {
        this.data.set('list', ['san', 'er', 'esui', 'etpl', 'esl']);
    }
});
var myApp = new MyApp();
myApp.attach(document.body);
console.log('webpack-dev-server');