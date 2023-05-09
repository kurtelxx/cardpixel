export type ModalWindowActionButton =
  | {
      text: string;
      callback: () => void;
    }
  | null
  | undefined;

export type CategoryType = "regular" | "positive" | "warning" | "attention";
