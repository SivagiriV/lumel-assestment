import type { RowData } from '../data/initialData';

export const calculateVariance = (original: number, current: number): number => {
  return original === 0 ? 0 : ((current - original) / original) * 100;
};

export const updateValueByPercentage = (
  data: RowData[],
  id: string,
  percent: number
): RowData[] => {
  return data.map(row => {
    if (row.id === id) {
      const updatedValue = row.originalValue + (percent / 100) * row.originalValue;
      const variance = calculateVariance(row.originalValue, updatedValue);
      return {
        ...row,
        value: updatedValue,
        variance,
      };
    } else if (row.children) {
      return {
        ...row,
        children: updateValueByPercentage(row.children, id, percent),
      };
    }
    return row;
  });
};

export const updateValueByDirectInput = (
  data: RowData[],
  id: string,
  newValue: number
): RowData[] => {
  return data.map(row => {
    if (row.id === id) {
      const variance = calculateVariance(row.originalValue, newValue);
      return {
        ...row,
        value: newValue,
        variance,
      };
    } else if (row.children) {
      return {
        ...row,
        children: updateValueByDirectInput(row.children, id, newValue),
      };
    }
    return row;
  });
};

export const updateParentValues = (data: RowData[]): RowData[] => {
  return data.map(row => {
    if (row.children) {
      const updatedChildren = updateParentValues(row.children);
      const sum = updatedChildren.reduce((acc, child) => acc + child.value, 0);
      const originalSum = updatedChildren.reduce((acc, child) => acc + child.originalValue, 0);
      const variance = calculateVariance(originalSum, sum);
      return {
        ...row,
        value: sum,
        originalValue: originalSum,
        variance,
        children: updatedChildren,
      };
    }
    return row;
  });
};
