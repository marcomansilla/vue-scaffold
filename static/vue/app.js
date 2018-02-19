window.bus = new Vue();

// Generic form component
Vue.component('modal',{
    template:`
<div>
<!-- Modal -->
<div class="modal fade in" id="modalComponent" tabindex="-1" role="dialog" aria-labelledby="modalComponentLabel" style="display:block">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button @click="$emit('close')" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="modalComponentLabel"><slot name="title"></slot></h4>
      </div>
      <div class="modal-body">
          <slot name="body"></slot>          
      </div>
    </div>
  </div>
</div>
<div class="modal-backdrop fade in" @click="$emit('close')"></div>
</div>
    `
});

// generic form class
class TestForm{
    constructor(data){
	let originalData=data;
	for (let field in data){
	    this[field]=data[field];
	}
    }

    displayData(){
	let data = Object.assign({}, this);
	delete data.originalData;
	delete this.id;

	console.log(data);
    }
}

// component with form HTML code
Vue.component('recordform',{
    template:`
<div>
    <form @submit.prevent="send()">
	<div class="form-group">
	    <label for="title">Title</label>
	    <input id="title"  class="form-control" name="" type="text" v-model="recordData.title"/>
	</div>

	<div class="form-group">
	    <label for="body">Body</label>
	    <textarea id="body" class="form-control" name="" type="text" v-model="recordData.body"/>
	</div>
        <button type="submit" class="btn btn-primary"><i class="fa fa-check"></i> Submit</button>
    </form>
</div>    
`,
    data(){
	return {
	    recordData: new TestForm({
		id:0,
		title:'',
		body:''
	    })	    
	};
    },
    methods:{
	record(id){
	    if (id>0){
		axios.get(`../services/api/doc/${id}`)
		    .then((result)=>{
			console.log(result.data.row);
			this.recordData.id=result.data.row.id;
			this.recordData.body=result.data.row.body;
			this.recordData.title=result.data.row.title;
			
		    })
		    .catch((error)=>console.log(error));
	    }
	},
	send(){
	    if (this.recordData.id>0){
		axios.put(`../services/api/doc/${this.recordData.id}`,{
		    title:this.recordData.title,
		    body:this.recordData.body
		})
		    .then(response=>bus.$emit('submittedForm', response))
		    .catch(error=>console.log(error));
	    }else{
		axios.post(`../services/api/doc`,{
		    title:this.recordData.title,
		    body:this.recordData.body
		})
		    .then(response=>bus.$emit('submittedForm',response))
		    .catch(error=>console.log(error));
	    }
	}
    },
    created(){
	bus.$on('workData', (data)=>{
	    this.record(data);
	});
    }
});

var app = new Vue({
    delimiters:['${','}'],
    el:'#app',
    data:{
	message:'',
	search:'',
	result:[],
	pagination:{
	    items:'',
	    next:'',
	    prev:''
	},
	modalData:{
	    showModal:false,
	    title:''
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
		    
		    this.pagination.prev=result.data.previous || null;
		    this.pagination.next=result.data.next || null;
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
	manageRecord(id=0){
	    
	    if (id>0){
		this.modalData.title='Edit record';
	    }else{
		this.modalData.title='Add new record';
	    }		
	    bus.$emit('workData', id);
	    this.modalData.showModal=true;
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
	},
	closeModal(){
	    this.modalData.showModal=false;
	    this.modalData.title='';
	}
    },
    created(){
	bus.$on('submittedForm', (data)=>{
	    this.closeModal();
	    console.log(data);
	    this.message='Record succesfully processed';
	});
    }
});







