////string
//String.prototype.format = function() {
//    var args = arguments;
//    return this.replace(/{(\d+)}/g, function(match, number) {
//        return typeof args[number] != 'undefined'
//            ? args[number]
//            : match
//            ;
//    });
//}
//interface String {
//    format(obj: any): string;
//}
///////////////////////
//array
//////
Array.prototype.where = function (fnPredicate) {
    // (items = self.items().where(function() {return this.ItemID() < currentItemID;}))
    var len = this.length;
    if (typeof fnPredicate !== "function") {
        throw new TypeError();
    }
    var matches = [];
    for (var i = 0; i < len; i++) {
        if (i in this) {
            var match = fnPredicate.call(this[i]);
            if (match) {
                matches.push(this[i]);
            }
        }
    }
    return matches;
};
//# sourceMappingURL=common.js.map