export class TodoModel{
    constructor() {
        this.list = ()=> import('@/api/resource/data.json');
        console.log(this.list);
        this.gettedList = [];
        this.loader = false;
    }
    async setList() {
        this.loader = true;
        this.gettedList = await this.list()
        // console.log(JSON.parse(this.gettedList))
        this.loader = false
    }
    async getList(filters){
        console.log(await this.list())
        let limit = filters.limit || 20;
        let page = filters.page || 1;
        let searchQuery = filters.search;
        if(searchQuery) {
            let filteredList = this.gettedList.find(k=> k.title.toLowerCase().includes(searchQuery.toLowerCase()));
            return {
                list: this.gettedList.splice(page -1 * limit, limit * page),
                total: filteredList.length,
            }
        }
        return {
            list: this.gettedList.splice(page -1 * limit, limit * page),
            total: this.gettedList.length
        };
    }
}
