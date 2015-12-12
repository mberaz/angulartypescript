/// <reference path="itemtype.ts" />
/// <reference path="listitem.ts" />
/// <reference path="common.ts" />
/// <reference path="config.ts" />

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
    public http: any;
    public config: Config;
    public doneItems: Array<ListItem>;
    public unDoneItems: Array<ListItem>;
    public remainingItemsCount: Number;
    public addingNew: boolean;
    public headers: Headers;
    public items =new Array<ListItem>();
    public types = new Array<ItemType>();
    public selectedType: ItemType;
    public selectedTypeId: number;


    constructor(http: Http) {
        this.config = new Config();
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.addingNew = false;

        this.http.get(this.config.apiBaseUrl + "Todo")
            .map(res=> res.json())
            .subscribe(
            data=> this.loadData(data),
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
            this.types.push(new ItemType(list[i].Id, list[i].Name));
        }

        this.selectedType = this.types[0];
        this.selectedTypeId = this.selectedType.id;
    }

    loadData(list: any) {
        for (var i = 0; i < list.length; i++) {
            this.items.push(new ListItem(list[i].Id, list[i].Name, list[i].IsDone, list[i].Type ));
        }

        this.doneItems = this.items.where(function() { return this.isDone; });
        this.unDoneItems = this.items.where(function() { return !this.isDone; });
        this.remainingItemsCount = this.items.length - this.doneItems.length;
    }

    onTypeSelection(event: any) {

        this.selectedTypeId = parseInt(event.currentTarget.value);
        alert(0 - this.selectedTypeId);
    }

    onChange(item: ListItem) {
        item.isDone = !item.isDone;
        this.doneItems = this.items.where(function() { return this.isDone; });
        this.unDoneItems = this.items.where(function() { return !this.isDone; });
        this.remainingItemsCount = this.items.length - this.doneItems.length;
    };


    addItem(event:any ) {
        this.addingNew = true;
        this.newItem = ListItem.CreateEmptyListItem();
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
            () => {}
            );
    }

    saveCallback(data: any) {
        this.unDoneItems.push(new ListItem( data.Id, this.newItem.name,  false,1));
    }

    cancel() {
        this.addingNew = false;
    }
    onSelect(item: ListItem) {
        this.selectedItem = item;
        this.selectedTypeId = item.type;
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
