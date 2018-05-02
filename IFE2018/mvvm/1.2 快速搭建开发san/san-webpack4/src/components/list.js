import san from 'san';
var MyApp = san.defineComponent({
  template: '<ul><li san-for="item in list">{{item}}</li></ul>',
  attached: function () {
    this.data.set('list', ['san', 'er', 'esui', 'etpl', 'esl']);
  }
});
var myApp = new MyApp();
myApp.attach(document.body);
