import { PublicForm } from "@/components/forms/public-form";
import { submissionsEnabled } from "@/lib/submissions";
export function ContactForm() {
  return <PublicForm kind="contact" enabled={submissionsEnabled()} />;
}
