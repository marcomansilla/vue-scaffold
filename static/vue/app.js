window.Event = new Vue();
// Generic form component
Vue.component('modal',{
    template:`
<div>
<!-- Modal -->
<div class="modal bs-example-modal-lg fade in" id="modalComponent" tabindex="-1" role="dialog" aria-labelledby="modalComponentLabel" style="display:block">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button @click="$emit('close')" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="modalComponentLabel"><slot name=title></slot></h4>
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
	delete data.errors;

	console.log(data);
    }
}
Vue.component('recordform',{
    template:`
<div>
    <form @submit.prevent="test">
	<div class="form-group">
	    <label for="title">Title</label>
	    <input id="title"  class="form-control" name="" type="text" value=""/>
	</div>

	<div class="form-group">
	    <label for="body">Body</label>
	    <textarea id="body" class="form-control" name="" type="text" value=""/>
	</div>
        <button type="submit" class="btn btn-primary"><i class="fa fa-check"></i> Submit</button>
        <button class="btn btn-danger"><i class="fa fa-window-close"></i> Cancel</button>
    </form>
</div>    
`,
    data(){
	return {
	    foo: new TestForm(),
	    param:''
	};
    },
    methods:{
    }
});

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
	newRecord(){
	    this.modalData.showModal=true;
	    this.modalData.title='Add new record';
	},
	updateRecord(id){
	    this.modalData.showModal=true;
	    this.modalData.title='Edit record';
	    
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
	}
    }
});
