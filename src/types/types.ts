export interface AllocationNode {
  id: string;
  label: string;
  value: number;
  originalValue: number;
  children: AllocationNode[];
}
