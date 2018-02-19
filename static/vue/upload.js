var upload=new Vue({
    delimiters:['${', '}'],
    el:'#upload',
    data:{
	files:'',
	subidas:[],
	images:[],
	imagen:'',
	form:{
	    name:'',
	    file:''
	}
    },
    methods:{
	postData(url, values){
	    axios.post(url,values)
		.then((response)=>{
		    console.log('file uploaded');
		    this.subidas.push=response.data.row.id;
		})
		.catch((error)=>{
		    console.log(error);
		});
	    console.log('posting data');
	},

	processImg(e){
	    this.subidas=[];
	    console.log('Processing img...');
	    this.imagen=e.target.files;

	    var formData = new FormData();

	    formData.append('name', this.imagen[0].name);
	    formData.append('filename', this.imagen[0]);
	    this.postData('../services/api/simpleupload', formData);
	}
    }
});
