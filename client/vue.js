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
    methods: {
        createTodo() {
            const {...todo} = this.form;

            this.todos.push({...todo, id: Date.now()});

            this.form.firstName = this.form.lastName = this.form.email = this.form.todo = '';
        }
    }
})
