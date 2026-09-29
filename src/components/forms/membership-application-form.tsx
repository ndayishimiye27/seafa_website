import { PublicForm } from "@/components/forms/public-form";
import { submissionsEnabled } from "@/lib/submissions";
export function MembershipApplicationForm() {
  return <PublicForm kind="join" enabled={submissionsEnabled()} />;
}
