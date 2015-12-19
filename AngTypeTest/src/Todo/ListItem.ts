class ListItem {
    id: number;
    name: string;
    isDone: boolean;
   // type: number;
    itemType: ItemType;
    constructor(id: number, name: string, isDone: boolean, itemType: ItemType) {
        this.id = id;
        this.name = name;
        this.isDone = isDone;
        this.itemType = itemType;
    }

    static CreateEmptyListItem() {
        return new ListItem(0, "", false, new ItemType(0,"Select a type"));
    }

}



