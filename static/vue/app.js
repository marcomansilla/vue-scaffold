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
	getData(url,foo){
	    axios[foo](url)
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
		this.getData(`../services/api/doc/?search=body contains "${this.search}"`,'get');
	    }else{
		this.result=[];
	    }
	
	},
	listAll(){
	    this.getData('../services/api/doc','get');
	},
	paginator(url){
	    this.getData(url,'get');
	},
	deleteRecord(id){
	    let remove=confirm('Please confirm to delete this item');
	    if (remove===true){
		axios.delete(`../services/api/doc/${id}`)
		    .then((result)=>{
			console.log(result);
			this.getData(`../services/api/doc/?search=body contains "${this.search}"`,'get');
		    })
		    .catch(error=>console.log(error.data));
	    }		
	}
	
    }
});

