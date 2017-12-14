var app = new Vue({
    delimiters:['${','}'],
    el:'#app',
    data:{
	search:'',
	result:[]
    },
    methods:{
	query(){
	    if (this.search.length>0){
		axios.get('../services/api/doc/?search=body contains '+'"'+this.search+'"')
		    .then(result=>this.result=result.data.rows)
		    .catch(error=>console.log(error));
	    }else{
		this.result=[];
	    }
	
	},
	listAll(){
	    axios.get('../services/api/doc')
		.then(result=>this.result=result.data.rows)
		.catch(error=>console.log(error));
	}
    }
});
