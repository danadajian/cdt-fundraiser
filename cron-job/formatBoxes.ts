import {chain, sortBy, sumBy} from "lodash";

export const formatBoxes = (boxes: {name: string, number: number}[]) => {
    return `Donation History:\n\n${chain(boxes)
        .groupBy('name')
        .map((value, key) => ({name: key, boxes: sortBy(value, 'number').map(box => box.number)}))
        .sortBy('name')
        .map(item => `${item.name}: ${item.boxes.map(box => `$${box}`).join(', ')}\n`)
        .split('\n,')
        .join('\n')
        .value()
        .trim()}`;
};

export const getBoxesTotal = (boxes: {name: string, number: number}[]) => {
    return sumBy(boxes, 'number');
};
