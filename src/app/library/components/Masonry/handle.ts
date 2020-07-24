
import { Data, ObjectColumn, ObjectIndex } from './types';

export const assignObjectColumn = (nColumns: number, index: number, targetObject: Data): ObjectColumn => ({ ...targetObject, ...{ column: index % nColumns } });

export const assignObjectIndex = (index: number, targetObject: ObjectColumn): ObjectIndex => ({ ...targetObject, ...{ index } });

export const containMatchingUri = (dest: Data[], source: Data[]) => {
    return source.filter(img => dest.findIndex(x => x.uri === img.uri) === -1)
}

export const onCheckNumber = (num: any) => {
    const actualNum = Number(String(num))
    if (isNaN(actualNum) || actualNum === Infinity || actualNum === -Infinity || actualNum <= 0) {
        return false;
    }
    return true;
}