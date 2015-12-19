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
    public items = new Array<ListItem>();
    public types = new Array<ItemType>();
    public selectedType: ItemType;
    public selectedTypeId: number;

    public searchTerm: string;


    constructor(http: Http) {
        this.config = new Config();
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.addingNew = false;
        this.searchTerm = "";
        //this.http.get(this.config.apiBaseUrl + "ItemTypes")
        //    .map(res=> res.json())
        //    .subscribe(
        //    data => this.loadTypes(data),
        //    err=> console.log(err),
        //    () => { }
        //    );

        this.http.get(this.config.apiBaseUrl + "Todo")
            .map(res=> res.json())
            .subscribe(
            data=> this.loadItems(data),
            err=> console.log(err),
            () => { }
            );
    }

    loadTypes(itemList: any, list: any) {
        for (var i = 0; i < list.length; i++) {
            this.types.push(new ItemType(list[i].Id, list[i].Name));
        }

        this.selectedType = this.types[0];
        this.selectedTypeId = this.selectedType.id;

        for (var i = 0; i < itemList.length; i++) {
            var type = this.getType(itemList[i].Type); 

            this.items.push(new ListItem(itemList[i].Id, itemList[i].Name, itemList[i].IsDone, type));
        }

        this.doneItems = this.items.where(function () { return this.isDone; });
        this.unDoneItems = this.items.where(function () { return !this.isDone; });
        this.remainingItemsCount = this.items.length - this.doneItems.length;
    }

    loadItems(itemList: any) {

        this.http.get(this.config.apiBaseUrl + "ItemTypes")
            .map(res=> res.json())
            .subscribe(
            data => this.loadTypes(itemList, data),
            err=> console.log(err),
            () => { }
            );
    }

    search(term: string) {

        term = term.toLowerCase();
        if (!term) {
            this.doneItems = this.items.where(function () { return this.isDone; });
            this.unDoneItems = this.items.where(function () { return !this.isDone; });
        } 
        else {
            this.doneItems = this.items.where(function () { return this.isDone && this.name.toLowerCase().indexOf(term)>-1; });
            this.unDoneItems = this.items.where(function () { return !this.isDone && this.name.toLowerCase().indexOf(term) > -1; });
        }
        
    }

    getType(id) {

        if (this.types) {
            return this.types.first(function () { return this.id == id });
        }
    }
    onChange(item: ListItem) {
        item.isDone = !item.isDone;
        this.doneItems = this.items.where(function () { return this.isDone; });
        this.unDoneItems = this.items.where(function () { return !this.isDone; });
        this.remainingItemsCount = this.items.length - this.doneItems.length;
    };


    addItem(event: any) {
        this.addingNew = true;
        this.newItem = ListItem.CreateEmptyListItem();
    }

    SaveNewItem() {

        if (this.newItem.itemType.id === 0 || this.newItem.name.trim() === '') {
            alert("You must fill all of the data!");
            return;
        }

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

        this.unDoneItems.push(new ListItem(data.Id, this.newItem.name, false, this.getType(data.Type)));
    }

    cancel() {
        this.addingNew = false;
    }
    onSelect(item: ListItem) {
        this.selectedItem = item;
       // this.selectedTypeId = item.type;
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
