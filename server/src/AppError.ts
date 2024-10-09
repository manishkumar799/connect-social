class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message); // Call the Error constructor
  
      this.name = this.constructor.name; // Set the error name
      this.statusCode = statusCode; // Set the custom status code
      this.isOperational = true; // Optional: Mark it as an operational error
  
      // Capture the stack trace, excluding this constructor call
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;
  