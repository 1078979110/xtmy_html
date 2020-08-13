export function fetch(url, data, method){
	if(!method){
		method = 'post';
	}

	return new Promise((resolve, reject)=>{
		axios({
			method: method,
			url: process.env.API_HOST + url,
			data:data
		}).then(res => {
			if(res.data.status == 401){
				alert("还未登陆，请先登录");
				router.replace({path:'/login'});
			}else{
				return res.data.data
			}
		}).cath((error)=>{
			reject(error)
		});
	});
}

/**
 * 异步get方式
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
/*function axios_get(url){
	axios.get(url).then(res=>{
		if(res.status == 401){
			this.$router.push({name:'login'});
			alert('还未登陆')
		}else{
			return res.data;
		}
	});
}*/
/**
 * [axios_post description]
 * @param  {[type]} url  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
/*function axios_post(url, data){
	axios.post(url,data).then(res=>{
		if(res.status == 401){
			this.$router.push({name:'login'});
			alert('还未登陆')
		}else{
			return res.data;
		}
	});
}*/