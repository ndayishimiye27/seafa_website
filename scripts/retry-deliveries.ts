import { retryTeamDeliveries } from "../src/lib/team-delivery";
async function main() {
  const report = await retryTeamDeliveries();
  console.log(JSON.stringify(report));
  if (report.pending || report.review || report.errors) process.exitCode = 1;
}
main().catch(() => {
  console.error(
    "Delivery retry failed. Check the private storage and configuration.",
  );
  process.exitCode = 1;
});
