import { Pipe} from "angular2/angular2";

@Pipe({
	name: "filterSelected",
})
export class FilterSelected
{
   
    transform(value: Array<Hero>, args: string[]): Array<Hero>
    {
        console.log("vals=" + value);
		var boolVal = args[1] === "true";
		return value.where(function() {
            return this[args[0]] === boolVal;
		});
	}
}