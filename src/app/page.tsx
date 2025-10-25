import { TodoContainer } from "@/components/TodoContainer";

export const dynamic = "force-dynamic"; // only in production

export default function Home() {
  return <TodoContainer />;
}
