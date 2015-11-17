import { bootstrap, Component, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http';

@Component({
    selector: 'my-app',
    templateUrl:'/src/views/heroView.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [`
  .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}
  .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }
  .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}
  .heroes .badge {
    font-size: small;
    color: white;
    padding: 0.1em 0.7em;
    background-color: #369;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -1px;
  }
  .selected { background-color: #EEE; color: #369; }
  `],
   
})

class AppComponent
{
    public title = 'Tour of Heroes';
    public selectedHero: Hero;
    public heroes = [];
    public http: any
    constructor(http:Http )
    {
        this.http = http;
        this.http.get('http://localhost:62788/API/Heroes')
            .map(res => res.json())
            .subscribe(
            data  => this.loadHeroesData(data),
            err => console.log(err),
            () => { }
            );
    }

    loadHeroesData(list: any)
    {
        for (var i = 0; i < list.length; i++)
        {
            this.heroes.push({ "id": list[i].id, "name": list[i].name } );
        } 
    }

    onSelect(hero: Hero)
    {
        this.selectedHero = hero;
    };

    getSelectedClass(hero: Hero)
    {
        return { 'selected': hero === this.selectedHero };
    };
}
bootstrap(AppComponent, [HTTP_BINDINGS]);
