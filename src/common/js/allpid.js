import getUserInfo from 'common/js/user'

export function getAllId() {
 let allPId =  getUserInfo().allPId
 let temp= []
 allPId.map((item,index) =>{
 	if(item){
 		temp.push(item)
 	}
 })
 return JSON.stringify(temp)
}