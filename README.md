# TaskFlow — React Task Manager

A small Todoist-inspired task management application built with React, Vite, and CSS.

## Features

- Add tasks
- Edit task titles
- Mark tasks as completed or pending
- Delete tasks
- Filter All, Pending, and Completed tasks
- Dashboard counts for total, pending, and completed tasks
- Save tasks in browser LocalStorage
- Responsive desktop and mobile layout

## Requirements

- Node.js (LTS version recommended)
- npm
- Visual Studio Code (recommended)

## Run the project

1. Extract `taskflow-react-app.zip`.
2. Open the extracted `taskflow-react-app` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Create a production build

```bash
npm run build
```

Vite creates the production files in the `dist` folder.

## How the application works

- `useState` stores the task list, current input, and selected filter.
- `useEffect` saves the task list to LocalStorage whenever it changes.
- `addTask` creates a task and adds it to state.
- `toggleTask` changes a task's completed status.
- `editTask` updates a task title.
- `deleteTask` removes a task.
- `filter` determines which tasks are displayed.

## Important notes

- This is a front-end learning project. It does not use a backend, database, login, or cloud sync.
- LocalStorage saves data only in the current browser profile on the current device.
- The starter tasks are sample data. You can edit or delete them.
- The app uses a Google Fonts import for typography; if offline, the browser uses a fallback font.

## Suggested manual test

1. Add a task named `Prepare for interview`.
2. Mark it completed.
3. Select Pending and confirm it is hidden.
4. Select Completed and confirm it appears.
5. Edit the task title.
6. Delete the task.
7. Add another task and refresh the page to verify LocalStorage persistence.
