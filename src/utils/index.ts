import type { RowData } from '../data/initialData';

export const calculateVariance = (orig: number, curr: number): number =>
  orig === 0 ? 0 : ((curr - orig) / orig) * 100;

export function applyAllocation(
  nodes: RowData[],
  id: string,
  input: number,
  mode: 'percent' | 'value'
): RowData[] {
  return nodes.map((row) => {
    if (row.id === id) {
      const newVal =
        mode === 'percent'
          ? row.originalValue + (row.originalValue * input) / 100
          : input;

      let newChildren = row.children;
      if (mode === 'value' && row.children) {
        const totalOrig = row.children.reduce((a, c) => a + c.originalValue, 0);
        newChildren = row.children.map((c) => {
          const ratio = totalOrig ? c.originalValue / totalOrig : 0;
          const val = parseFloat((newVal * ratio).toFixed(2));
          return {
            ...c,
            value: val,
            originalValue: val,
            variance: calculateVariance(val, val),
            children: c.children ? [...c.children] : undefined,
          };
        });
      }

      return {
        ...row,
        value: newVal,
        originalValue: newVal,
        variance: calculateVariance(row.originalValue, newVal),
        children: newChildren,
      };
    }

    if (row.children) {
      const children = applyAllocation(row.children, id, input, mode);
      const sum = children.reduce((a, c) => a + c.value, 0);
      return {
        ...row,
        children,
        value: sum,
        variance: calculateVariance(row.originalValue, sum),
      };
    }

    return row;
  });
}
