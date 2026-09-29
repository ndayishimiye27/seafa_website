import { PublicForm } from "@/components/forms/public-form";
import { submissionsEnabled } from "@/lib/submissions";
export function MatchRequestForm() {
  return <PublicForm kind="match-requests" enabled={submissionsEnabled()} />;
}
