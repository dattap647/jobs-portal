import axios from "axios"


export const baseurl="https://teknorix.jobsoid.com/api/v1"
export const endpoints={
JOBS:"/jobs",
LOCATION:"/locations",
DEPARTMENTS:'/departments',
DIVISION:'/divisions',
FUNCTION:'/functions'

}

export const Api=(method,endpoints,query={},data)=>{
    return axios({
        method:method,
        url:endpoints,
        params:{...query},
        data:data,
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((response)=>response)
}
