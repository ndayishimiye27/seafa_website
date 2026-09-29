import { handleSubmission } from "@/lib/submissions";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleSubmission(request, "match-requests");
}
