/** Private stored requests; never publish these records. */
import type { FormKind, SubmissionData } from "@/content/form-fields";
export interface StoredSubmission {
  id: string;
  kind: FormKind;
  receivedAt: string;
  data: SubmissionData;
}
