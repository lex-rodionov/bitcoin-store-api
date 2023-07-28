class Logger {
  constructor() {
    this.port = process.env.PORT;
  }

  logResponse(result) {
    const now = new Date().toLocaleString('en-GB');

    console.log(`Responsed At: ${now}`);
    console.log(result);
  }

  logError(message) {
    const now = new Date().toLocaleString('en-GB');

    console.log(`Error In: ${now}`);
    console.log(message);
  }

  logRequest(request) {
    const {path, method, hostname} = request;
    const url = `${hostname}:${this.port}${path}`;
    const body = JSON.stringify(request.body);

    const curl = this._generateCurl(method, url, body);
    this._printRequest(curl);
  }

  _generateCurl(method, url, body) {
    return  `curl --location --request ${method} '${url}' \\
--header 'Content-Type: application/json' \\
--data-raw '${body}'
    `
  }

  _printRequest(curl) {
    const now = new Date().toLocaleString('en-GB');

    console.log(`Requested At: ${now}`);
    console.log(curl);
  }
}

module.exports = new Logger();