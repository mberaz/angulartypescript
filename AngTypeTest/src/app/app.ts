import { bootstrap, Component, FORM_DIRECTIVES, CORE_DIRECTIVES, Pipe, PipeTransform} from 'angular2/angular2';
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http';



@Component({
    selector: 'my-app',
    templateUrl:'/src/views/heroView.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [`
  
  `],    
})

class AppComponent
{
    public title = 'Tour of Heroes';
    public selectedHero: Hero;
    public heroes = [];
    public selectedHeroescCount:number=0;
    public http: any;
    constructor(http:Http )
    {
        var config = new Config();
        this.http = http;
        this.http.get(config.apiBaseUrl+ 'Heroes')
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
            this.heroes.push({ id: list[i].id, name: list[i].name, selected:false } );
        } 
    }

    onChange(hero: Hero)
    {
       hero.selected=!hero.selected;
       this.selectedHeroescCount=this.heroes.filter(function (x){return x.selected;}).length;    
    };

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
