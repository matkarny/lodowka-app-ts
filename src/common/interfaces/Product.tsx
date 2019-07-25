export interface IProduct {
  name: string;
  expirationDate: { year: number; month: number; day: number };
  vitalityColor: string,
  addedBy: string;
  tagPosition: { left: number; top: number };
  id: number;
  shownPopup?: boolean;
}
