import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { DataTable } from "@/components/ui/data-table";
import { SectionCards } from "@/components/ui/section-cards";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable
              data={[
                {
                  id: 1,
                  header: "Cover page",
                  type: "Cover page",
                  status: "In Process",
                  target: "18",
                  limit: "5",
                  reviewer: "Eddie Lake",
                },
                {
                  id: 2,
                  header: "Table of contents",
                  type: "Table of contents",
                  status: "Done",
                  target: "29",
                  limit: "24",
                  reviewer: "Eddie Lake",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
