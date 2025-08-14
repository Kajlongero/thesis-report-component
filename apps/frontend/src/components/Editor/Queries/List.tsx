import { Button } from "../../ui/Button";
import { type DbQuery } from "./Manager"; // Importaremos el tipo desde el padre

interface QueryListProps {
  queries: DbQuery[];
  onTestQuery: (queryText: string) => void;
}

export const QueryList = ({ queries, onTestQuery }: QueryListProps) => {
  if (queries.length === 0) {
    return null; // No mostramos nada si no hay queries
  }

  return (
    <div className="border-t border-gray-200 pt-4">
      <h4 className="font-semibold mb-2">Queries Guardadas</h4>
      <ul className="space-y-2">
        {queries.map((q) => (
          <li
            key={q.id}
            className="p-3 bg-gray-50 rounded-md border flex justify-between items-center"
          >
            <pre className="text-sm text-gray-700 flex-1 overflow-x-auto">
              <code>{q.query}</code>
            </pre>
            <div className="ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTestQuery(q.query)}
              >
                Probar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
