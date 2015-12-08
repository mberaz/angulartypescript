import { bootstrap, Component, FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/angular2";
import {Http, HTTP_BINDINGS, Headers} from "angular2/http";


@Component({
    selector: "my-app",
    templateUrl: "/src/views/ListApp.html",
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],

})

class AppComponent {
    public title = "Michaels TODO app";
    public navBarLInkText = "a random link";
    public selectedItem: ListItem;
    public newItem: ListItem;
    public items = [];
    public http: any;
    public config: Config;
    public doneItems: Array<ListItem>;
    public unDoneItems: Array<ListItem>;
    public remainingItemsCount: Number;
    public addingNew: boolean;
    public headers: Headers;
    public types= [];
    public selectedType:ItemType;

    constructor(http: Http) {
        this.config = new Config();
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.addingNew = false;
        this.http.get(this.config.apiBaseUrl + "Todo")
            .map(res=> res.json())
            .subscribe(
            data => this.loadData(data),
            err=> console.log(err),
            () => { }
            );

        this.http.get(this.config.apiBaseUrl + "ItemTypes")
            .map(res=> res.json())
            .subscribe(
            data => this.loadTypes(data),
            err=> console.log(err),
            () => { }
            );

    }

    loadTypes(list: any){
        for (var i = 0; i < list.length; i++)
        {
            this.types.push({ id: list[i].Id, name: list[i].Name });
            //this.types.push(new ItemType(list[i].Id, list[i].Name));
        }
    }

    loadData(list: any) {
        for (var i = 0; i < list.length; i++) {
            this.items.push({ id: list[i].Id, name: list[i].Name, isDone: list[i].IsDone });
        }

        this.doneItems = this.items.where(function() { return this.isDone; });
        this.unDoneItems = this.items.where(function() { return !this.isDone; });
        this.remainingItemsCount = this.items.length - this.doneItems.length;
    }

    onTypeSelection(event: any) {
        alert("dd");
    }

    onChange(item: ListItem) {
        item.isDone = !item.isDone;
        this.doneItems = this.items.where(function() { return this.isDone; });
        this.unDoneItems = this.items.where(function() { return !this.isDone; });
        this.remainingItemsCount = this.items.length - this.doneItems.length;
    };


    addItem(event, el) {
        this.addingNew = true;
        this.newItem = new ListItem();
    }

    SaveNewItem() {
        this.addingNew = false;
        var data = JSON.stringify(this.newItem);
        this.http.post(this.config.apiBaseUrl + "Todo", data, {
            headers: this.headers
        })
            .map(res=> res.json())
            .subscribe(
            data => this.saveCallback(data),
            err=> console.log(err),
            () => { }
            );
    }

    saveCallback(data: any) {
        this.unDoneItems.push({ id: data.Id, name: this.newItem.name, isDone: false });
    }

    cancel() {
        this.addingNew = false;
    }
    //showHero(res: any)
    //{
    //    alert("Hero from server: " + res.name);
    //}
    onSelect(item: ListItem) {
        this.selectedItem = item;
    };

    setClass(item: ListItem) {
        return item.isDone ? "label-success" : "label-info";
    };


    getSelectedClass(item: ListItem) {
        return { "selected": item === this.selectedItem };
    };

    updateName(item: ListItem) {
        var data = JSON.stringify(this.selectedItem);
        this.http.put(this.config.apiBaseUrl + "Todo", data, {
            headers: this.headers
        })
            .map(res=> res.json())
            .subscribe(
            data => this.showAlert(data),
            err=> console.log(err),
            () => { }
            );
    }

    showAlert(data: any) {
        alert("ok");
    }
}


bootstrap(AppComponent, [HTTP_BINDINGS]);
