class CustomErrorApi extends Error{
    constructor(message){
        super(message);
        this.msg = message;
    }
}

module.exports = CustomErrorApi;