This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to run the source code

First, install packages:

```bash
npm install
# or
pnpm install
```

Second, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Can add tasks with a short description
- Show a list of all tasks(completed/uncompleted)
- Can set a task as completed or uncompleted
- Can delete a task
- Can update the task description(by long press textarea)
- Can sort tasks by time the tasks are created
- Can filter or search tasks
- Make the UI responsive
- (additional) Light mode/dark mode
- (additional) Can undo at most 20 items which recently been deleted.

## Project Overview

### `public/`

- Contains static files such as images and icons.

### `src/app/`

- `favicon.ico`: The favicon for the application.
- `globals.css`: Global CSS styles for the application.
- `layout.tsx`: Layout component that wraps the application content.
- `page.tsx`: The main page component of the application.

### `src/components/TodoList/`

- `hooks.ts`: Custom hooks used in the TodoList component.
- `ListItem.tsx`: Component for rendering individual todo list items.
- `Skeletons.tsx`: Skeleton loading components for the TodoList.
- `Textarea.tsx`: Component for rendering a text area input.
- `TodoList.tsx`: The main TodoList component.
- `type.ts`: Type definitions used in the TodoList components.

### `src/components/ui/`

- Basic components

### `src/lib/`

- Utility functions and custom libraries.

### Configuration Files

- `.eslintrc.json`: ESLint configuration file.
- `.gitignore`: Git ignore file.
- `.prettierrc`: Prettier configuration file.
- `components.json`: Configuration for component generation or management.
- `next-env.d.ts`: TypeScript definitions for Next.js.
- `next.config.mjs`: Next.js configuration file.
- `package-lock.json`: Lockfile for npm dependencies.
- `package.json`: Dependencies and scripts for the project.
- `pnpm-lock.yaml`: Lockfile for pnpm dependencies.
- `postcss.config.js`: PostCSS configuration file.
