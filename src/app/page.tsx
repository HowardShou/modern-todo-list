import { ModeToggle } from '@/components/ModeToggle'
import { TodoList } from '@/components/TodoList/TodoList'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between py-5">
      <div className="flex justify-end w-1/2 min-w-[320px] mb-3">
        <ModeToggle />
      </div>
      <TodoList />
    </main>
  )
}
