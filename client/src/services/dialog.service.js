class DialogService {
    alert(title, message){
        return new Promise((resolve, reject)=>{
            alert(message);
            resolve();
        });
    }

    error(err){
        return new Promise((resolve, reject)=>{
            alert(`Error: ${err.message}`);
            resolve();
        });
    }
}

export default new DialogService();