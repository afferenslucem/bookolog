import { CollectionData } from "./collection-data";

export class Collection {
    guid: string;
    modifyDate: Date;
    createDate: Date;
    name: string;
    description: string;

    public constructor(data: CollectionData) {
        this.guid = data.guid;

        this.modifyDate = new Date(data.modifyDate);
        this.createDate = new Date(data.createDate);

        this.name = data.name;
        this.description = data.description;
    }
}
