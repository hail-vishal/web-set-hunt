import axios from 'axios';

async function networkRequest(method,url,data){
    // console.log(data);
    try{
        const response = await axios({
            method,
            url,
            data,
            headers: {
                'Content-Type': 'application/json'
              }
        });
        return response;
    }
    catch(error){
        // console.log(error.response);
        return error.response;
    }
}

export default networkRequest;