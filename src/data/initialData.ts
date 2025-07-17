export interface RowData {
  id: string;
  label: string;
  value: number;
  originalValue: number;
  variance: number;
  children?: RowData[];
}

export const tableData: RowData[] = [
  {
    id: 'electronics',
    label: 'Electronics',
    value: 1500,
    originalValue: 1500,
    variance: 0,
    children: [
      { id: 'phones', label: 'Phones', value: 800, originalValue: 800, variance: 0 },
      { id: 'laptops', label: 'Laptops', value: 700, originalValue: 700, variance: 0 },
    ],
  },
  {
    id: 'furniture',
    label: 'Furniture',
    value: 1000,
    originalValue: 1000,
    variance: 0,
    children: [
      { id: 'chairs', label: 'Chairs', value: 400, originalValue: 400, variance: 0 },
      { id: 'tables', label: 'Tables', value: 600, originalValue: 600, variance: 0 },
    ],
  },
];
