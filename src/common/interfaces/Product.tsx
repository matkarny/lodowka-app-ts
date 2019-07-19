export interface Product {
  name: string;
  expirationDate: { year: string; month: string; day: string };
  addedBy: string;
  tagPosition: { left: number; top: number };
  id: number;
  shownPopup?: boolean;
}
