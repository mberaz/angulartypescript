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
var FilterSelected = (function () {
    function FilterSelected() {
    }
    FilterSelected.prototype.transform = function (value, args) {
        console.log("vals=" + value);
        var boolVal = args[1] === "true";
        return value.where(function () {
            return this[args[0]] === boolVal;
        });
    };
    FilterSelected = __decorate([
        angular2_1.Pipe({
            name: "filterSelected",
        }), 
        __metadata('design:paramtypes', [])
    ], FilterSelected);
    return FilterSelected;
})();
exports.FilterSelected = FilterSelected;
//# sourceMappingURL=filterSelected.js.map