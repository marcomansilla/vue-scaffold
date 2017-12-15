var app = new Vue({
    delimiters:['${','}'],
    el:'#app',
    data:{
	search:'',
	result:[],
	pagination:{
	    items:'',
	    next:'',
	    prev:''
	}
    },
    methods:{
	getData(url){
	    axios.get(url)
		    .then((result)=>{
			this.result=result.data.rows;
			this.pagination.items=result.data.count;
			this.pagination.next=result.data.next;
			console.log(result.data);
			if (result.data.previous) {
			    this.pagination.prev=result.data.previous;
			}else{
			    this.pagination.prev='';
			}
			if (result.data.next) {
			    this.pagination.next=result.data.next;
			}else{
			    this.pagination.next='';
			}
		    })
		    .catch(error=>console.log(error));
	},
	query(){
	    if (this.search.length>0){
		this.getData(`../services/api/doc/?search=body contains "${this.search}"`);
	    }else{
		this.result=[];
	    }
	
	},
	listAll(){
	    this.getData('../services/api/doc');
	},
	paginator(url){
	    this.getData(url);
	}
    }
});

