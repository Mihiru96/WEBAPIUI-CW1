class ResponseDto {
    constructor(code, status, message, data, token) {
      this.code = code;
      this.status = status;
      this.message = message;
      this.data = data;
      this.token = token;
    }
  }
  
  export default ResponseDto;