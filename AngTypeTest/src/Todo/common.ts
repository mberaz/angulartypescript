////string
String.prototype.format = function ()
{
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number)
    {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
}

String.prototype.reverse = function ()
{
    return this.split("").reverse().join("");
}

interface String
{
    format(obj: any): string;
    reverse(): string;
}
///////////////////////
//array
//////

Array.prototype.where = function (fnPredicate)
{ 
    // (items = self.items().where(function() {return this.ItemID() < currentItemID;}))
    var len = this.length;
    if (typeof fnPredicate !== "function")
    {
        throw new TypeError();
    }
    var matches = [];
    for (var i = 0; i < len; i++)
    {
        if (i in this)
        {
            var match = fnPredicate.call(this[i]);
            if (match)
            {
                matches.push(this[i]);
            }
        }
    }

    return matches;
};
interface Array<T>
{
    where(obj: any): Array<T>;
}