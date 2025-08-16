import { usePlaceholder } from "../../hooks/usePlaceholder";

import { PlaceholdersContext } from "../index";

export const PlaceholdersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    placeholders: state,
    addPlaceholder,
    setPlaceholders,
    removePlaceholder,
    updatePlaceholder,
    clearPlaceholders,
  } = usePlaceholder();

  const { placeholders } = state;

  return (
    <PlaceholdersContext.Provider
      value={{
        placeholders,
        addPlaceholder,
        setPlaceholders,
        removePlaceholder,
        updatePlaceholder,
        clearPlaceholders,
      }}
    >
      {children}
    </PlaceholdersContext.Provider>
  );
};
