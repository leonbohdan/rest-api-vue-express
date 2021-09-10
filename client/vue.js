import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js';

Vue.component('loader', {
    template: `
        <div class="text-center">
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `
});

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
            todos: [],
            loading: false
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
        async createTodo() {
            const {...todo} = this.form;

            const newTodo = await request('/api/todos', 'POST', todo);

            this.todos.push(newTodo);

            this.form.firstName = this.form.lastName = this.form.email = this.form.todo = '';
        },
        async markTodo(id) {
            const todo = this.todos.find(td => td.id === id);
            const updatedTodo = await request(`api/todos/${id}`, 'PUT', {
                ...todo,
                marked: true
            });
            todo.marked = updatedTodo.marked;
        },
        async deleteTodo(id) {
            await request(`api/todos/${id}`, 'DELETE');
            this.todos = this.todos.filter(td => td.id !== id);
        }
    },
    async mounted() {
        this.loading = true;
        this.todos = await request('/api/todos');
        this.loading = false;
    }
});

async function request(url, method = "GET", data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })

        return response.json();
    } catch(e) {
        console.warn('Error', e.message);
    }
}
