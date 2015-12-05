var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var http_1 = require("angular2/http");
var stringReverse_1 = require("./pipes/stringReverse");
var AppComponent = (function () {
    function AppComponent(http) {
        var _this = this;
        this.title = "Tour of Heroes";
        this.heroes = [];
        this.selectedHeroescCount = 0;
        this.config = new Config();
        this.http = http;
        this.http.get(this.config.apiBaseUrl + "Heroes")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.loadHeroesData(data); }, function (err) { return console.log(err); }, function () { });
    }
    AppComponent.prototype.loadHeroesData = function (list) {
        for (var i = 0; i < list.length; i++) {
            this.heroes.push({ id: list[i].id, name: list[i].name, selected: false });
        }
    };
    AppComponent.prototype.onChange = function (hero) {
        hero.selected = !hero.selected;
        this.selectedHeroes = this.heroes.where(function () { return this.selected; });
        this.selectedHeroescCount = this.selectedHeroes.length;
    };
    ;
    AppComponent.prototype.showHero = function (res) {
        alert("Hero from server: " + res.name);
    };
    AppComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    ;
    AppComponent.prototype.getSelectedClass = function (hero) {
        return { "selected": hero === this.selectedHero };
    };
    ;
    AppComponent = __decorate([
        angular2_1.Component({
            selector: "my-app",
            templateUrl: "/src/views/heroView.html",
            directives: [angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES],
            pipes: [stringReverse_1.StringReverse]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
})();
angular2_1.bootstrap(AppComponent, [http_1.HTTP_BINDINGS]);
//# sourceMappingURL=app.js.map