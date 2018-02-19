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
	
	// processImg(e){
	//     // get images
	//     this.subidas=[];
	//     console.log('Processing img...');
	//     this.imagen=e.target.files;
	//     var images=e.target.files;
	    
	//     // encode and post
	//     if (images.length>1){
	// 	for (i=0;i<images.length;i++){
	// 	    this.encondeImg(images[i]);
	// 	    console.log(this.subidas);
	// 	}
	//     }else{
	// 	this.encondeImg(images[0]);
	//     }
	//     console.log(this.subidas);
	// },

	// encondeImg(file){
	//     var reader = new FileReader();
	//     reader.readAsDataURL(file);
	//     console.log('encoding...');
	//     reader.onload = (file)=> {
	// 	this.postData('../services/api/simpleupload', {name:file.name, filename:reader.result});
	//     };

	//     reader.onerror = (error)=> {
	// 	console.log('Error: ', error);
	//     };	       
	// }
    }
});
