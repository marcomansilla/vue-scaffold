var upload=new Vue({
    delimiters:['${', '}'],
    el:'#upload',
    data:{
	files:'',
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
		.then((response)=>{console.log('file uploaded');
				   console.log('Success!!');})
		.catch((error)=>{console.log(error);});
	    console.log('posting data');
	},
	processImg(e){
	    console.log('Processing img...');
	    this.imagen=e.target.files;
	    let img=e.target.files;
	    // var imgBlob=this.encodeBlob(img[0]);
	    this.encodeBlob(img[0]);

	    
	},
	encodeBlob(file) {
	    var reader = new FileReader();
	    var fileBlob='';
	    reader.readAsDataURL(file);
	    console.log('encoding');
	    reader.onload = (file)=> {
		console.log(reader.result);
		this.postData('../services/api2/simpleupload.json', {name:'some ugly ass name', filename:reader.result});
	    };

	    reader.onerror = (error)=> {
		console.log('Error: ', error);
	    };
	    
	}

    }
});
