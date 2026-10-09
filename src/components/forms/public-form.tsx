import type { FormKind } from "@/content/form-fields";
import { ComposerForm } from "./composer-form";

export function PublicForm({ kind }: { kind: FormKind }) {
  return <ComposerForm kind={kind} />;
}
