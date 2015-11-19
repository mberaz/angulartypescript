class Hero
{
    id: number;
    name: string;
    selected:boolean;
}


class Config
{
    public apiBaseUrl: string;

    constructor() {
        //this.apiBaseUrl = 'http://localhost:62788/API/';
        this.apiBaseUrl = 'http://localhost:65413/API/';
    }
}
