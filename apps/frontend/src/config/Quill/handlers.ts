export interface CustomToolbarHandlers {
  [x: string]: () => void;
}

type HandlerElement = Record<string, () => unknown>;

export const createCustomHandlers = (
  elements: HandlerElement
): CustomToolbarHandlers => {
  return elements;
};
