import { Button } from "../../ui/Button";
import { type DbQuery } from "./Manager"; // Importaremos el tipo desde el padre

interface QuerySelectorProps {
  allQueries: DbQuery[];
  selectedQueryId: string;
  onSelectionChange: (newQueryId: string) => void;
  onTest: (queryId: string) => void;
  onRemove: () => void;
}

export const QuerySelector = ({
  allQueries,
  selectedQueryId,
  onSelectionChange,
  onTest,
  onRemove,
}: QuerySelectorProps) => {
  return (
    <div className="p-3 bg-gray-50 rounded-md border flex items-center space-x-4">
      <select
        value={selectedQueryId}
        onChange={(e) => onSelectionChange(e.target.value)}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        {allQueries.map((q) => (
          <option key={q.id} value={q.id}>
            {q.query}
          </option>
        ))}
      </select>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onTest(selectedQueryId)}
      >
        Probar
      </Button>
      <Button variant="danger" size="sm" onClick={onRemove}>
        X
      </Button>
    </div>
  );
};
