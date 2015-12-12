class ListItem {
    id: number;
    name: string;
    isDone: boolean;
    type: number;
    constructor(id: number, name: string, isDone: boolean, type: number) {
        this.id = id;
        this.name = name;
        this.isDone = isDone;
        this.type = type;
    }

    static CreateEmptyListItem() {
        return new ListItem(0, "", false, 1);
    }

}



