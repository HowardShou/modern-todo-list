import { ModeToggle } from '@/components/ModeToggle'
import { TodoListSkeleton } from '@/components/TodoList/Skeletons'
import { TodoList } from '@/components/TodoList/TodoList'
import { ListItem } from '@/components/TodoList/type'
import { Suspense } from 'react'

// mock api call
const listApi = async (): Promise<ListItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, content: 'Hi there', editable: false, checked: false, timestamp: 1719147588991 },
        {
          id: 2,
          content: 'long press me can edit item',
          editable: false,
          checked: false,
          timestamp: 1719147588992,
        },
        {
          id: 3,
          content: 'Press "Toggle delete" button will show delete buttons~',
          editable: false,
          checked: false,
          timestamp: 1719147588993,
        },
        {
          id: 4,
          content: 'Undo button can recover at most 20 items which recently been deleted...',
          editable: false,
          checked: false,
          timestamp: 1719147588994,
        },
        {
          id: 5,
          content: 'the recover item will back to the order it was',
          editable: false,
          checked: false,
          timestamp: 1719147588995,
        },
      ])
    }, 5000)
  })
}

const TodoListComponent = async () => {
  const todos = await listApi()
  return <TodoList todos={todos} />
}

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between py-5">
      <div className="flex justify-end w-1/2 min-w-[320px] mb-3">
        <ModeToggle />
      </div>
      <div className="relative bg-white dark:bg-black rounded-lg w-1/2 min-w-[320px] h-fit">
        <Suspense fallback={<TodoListSkeleton />}>
          <TodoListComponent />
        </Suspense>
      </div>
    </main>
  )
}
