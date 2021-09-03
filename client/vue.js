import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js';

new Vue({
    el: '#app',
    data() {
        return{
            form: {
                firstName: '',
                lastName: '',
                email: '',
                todo: ''
            },
            todos: []
        }
    },
    computed: {
        canCreate() {
            return this.form.firstName.trim() 
                && this.form.lastName.trim() 
                && this.form.email.trim() 
                && this.form.todo.trim();
        }
    },
    methods: {
        createTodo() {
            const {...todo} = this.form;

            this.todos.push({...todo, id: Date.now(), marked: false});

            this.form.firstName = this.form.lastName = this.form.email = this.form.todo = '';
        },
        markTodo(id) {
            const todo = this.todos.find(td => td.id === id);
            todo.marked = true;
        },
        deleteTodo(id) {
            this.todos = this.todos.filter(td => td.id !== id);
        }
    }
})
