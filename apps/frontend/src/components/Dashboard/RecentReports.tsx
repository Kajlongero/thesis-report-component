import { Button } from "../Commons/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../Commons/Card";

import { ReportCard } from "../Reports/Card";
import type { Reports } from "../../types/reports";
import { useId } from "react";

type Props = {
  data: Reports[];
  loading: boolean;
};

export const RecentReports = ({ data, loading }: Props) => {
  const id = useId();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Reports</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!loading ? (
            data.map((report, i) => (
              <ReportCard
                {...(report as unknown as Reports)}
                key={`${i}-${id}`}
              />
            ))
          ) : (
            <div className="w-full flex justify-center items-center min-h-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
            </div>
          )}
          {!loading && data.length === 0 && (
            <p className="text-center text-muted-foreground">
              No hay reportes recientes.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
