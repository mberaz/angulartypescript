import { Pipe} from "angular2/angular2";

@Pipe({
    name: "stringReverse",
})
export class StringReverse
{

    transform(value: string, args: string[]): string
    {
        return value.reverse();
    };
}