const renderTodos = (todos) => {
	let todosHtml = "";
	todos.forEach((todo) => {
		todosHtml += renderTodo(todo);
	});
	return `<ul class="task">
${todosHtml}
</ul>`;
};

const renderTodo = (todo) =>
	`<li>
<label
  ><input type="checkbox" name="existingTask${todo.id}" ${
		todo.complete ? "checked" : ""
	} />${todo.task}
</label>
<button type="button">Delete</button>
</li>`;

export default { renderTodo, renderTodos };
