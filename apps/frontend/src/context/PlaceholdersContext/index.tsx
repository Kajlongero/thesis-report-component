import { usePlaceholder } from "../../hooks/usePlaceholder";

import { PlaceholdersContext } from "../index";

export const PlaceholdersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    placeholders,
    addPlaceholder,
    setPlaceholders,
    removePlaceholder,
    clearPlaceholders,
    addQuery,
    removeQuery,
  } = usePlaceholder();

  return (
    <PlaceholdersContext.Provider
      value={{
        placeholders,
        addPlaceholder,
        setPlaceholders,
        removePlaceholder,
        clearPlaceholders,
        addQuery,
        removeQuery,
      }}
    >
      {children}
    </PlaceholdersContext.Provider>
  );
};
