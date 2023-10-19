const mainTemplate = (options, content) => `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/style.css" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=M+PLUS+Code+Latin:wght@700&display=swap"
			rel="stylesheet"
		/>
		<title>Senny's To-Do List</title>
	</head>
	<body>
		<header><h1 class="title">Senny's To-Do List</h1></header>
		<main>
            <section>
				${options}
			</section>
			<section>
				${content}
			</section>
			<section>
				<ul class="newTask">
					<li>
						<label>
							<span>New To-do:</span>
							<input
								id="new_task"
								type="text"
								name="new_task"
								placeholder="What do you have to do next?"
							/>
						</label>
						<button type="button">Create</button>
					</li>
				</ul>
			</section>
		</main>
	</body>
</html>
`;

export default mainTemplate;
