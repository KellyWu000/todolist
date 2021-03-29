
document.querySelector('.btn-new').addEventListener('click',function(){
addTodos();
});
document.querySelector('.todo-input').addEventListener('keypress',function(e){
if (e.which===13) {
addTodos();

}
});


function addTodos() {
const inputValue = document.querySelector('.todo-input').value; 


if( inputValue.trim().length === 0) {
    alert('請輸入文字');
    return;
}; //確認是否為空值

//新增todo

 const newTodo = document.createElement('li');
 newTodo.classList.add('todo');
 newTodo.innerHTML = `
 <label class="todo-title">
<input class="todo-check" type="checkbox">
<span>${inputValue}</span>
</label>
<button class="btn-delete"><i class="fas fa-times"></i></button>
 `

 document.querySelector('.todo-list').appendChild(newTodo);
 document.querySelector('.todo-input').value='';        
}


document.querySelector('.todo-list').addEventListener('click',function (event) {
const target = event.target;
if(target.classList.contains('btn-delete')){
target.parentNode.remove();

}
});
document.querySelector('.todo-list').addEventListener('click',function (event) {
const target = event.target;
if(target.classList.contains( 'todo-check')){
target.parentNode.classList.toggle('todo__done')

}
});

document.getElementById('start').addEventListener('click',function(){
    // timestart();
    // run();
    alert('123')
    window.setInterval(run,1000);

})

function timestart(){

}

function run(){
    var s = document.getElementById("dd");
    s.innerHTML =s.innerHTML-1;
}
