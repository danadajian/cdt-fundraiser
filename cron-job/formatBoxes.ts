import {chain, sumBy} from "lodash";

export const formatBoxes = (boxes: {name: string, number: number}[]) => {
    return chain(boxes)
        .groupBy('name')
        .map((value, key) => ({name: key, boxes: value.map(box => box.number)}))
        .sortBy('name')
        .value();
};

export const getBoxesTotal = (boxes: {name: string, number: number}[]) => {
    return sumBy(boxes, 'number');
};
