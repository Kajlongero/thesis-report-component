import { QuillContext } from "..";

import useQuillEditor from "../../hooks/useQuill";

export const QuillProvider = ({ children }: { children: React.ReactNode }) => {
  const useQuillProps = useQuillEditor();

  return (
    <QuillContext.Provider
      value={{
        ...useQuillProps,
      }}
    >
      {children}
    </QuillContext.Provider>
  );
};
