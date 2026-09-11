export enum CategoryType {
    FIRST = 0,
    SECOND = 1
}
export interface ViewModeProps{
    id: string | number,
    label: string,
    value: CategoryType,
}