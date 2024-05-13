import { StickyDirection } from "@angular/cdk/table";

export interface GetListInterface {
    NumPage: number,
    NumRecordsPage: number,
    Order: string,
    Sort: string,
    NumFilter?: number,
    TextFilter?: string,
    StateFilter?: number,
    StartDate?: Date,
    Download?: boolean,


}