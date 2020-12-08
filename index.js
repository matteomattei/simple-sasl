const net = require("net");

module.exports.authenticate = function (params, callback) {
  const client = new net.Socket();

  client.connect(params.port, params.host, function () {
    if (params.debug === true) {
      console.log("SASL Connected");
    }
    client.write("VERSION\t1\t1\n");
    client.write("CPID\t1000\n");

    if (params.method === "plain") {
      let data = Buffer.from(`\0${params.user}\0${params.password}`);
      let token = data.toString("base64");
      client.write(
        `AUTH\t1\tPLAIN\tservice=imap\trip=${client.localAddress}\tresp=${token}\n`
      );
    } else {
      client.destroy();
      return callback(`Unsupported ${params.type} metod`);
    }
  });

  client.on("data", function (data) {
    if (data.toString().indexOf("OK") === 0) {
      if (params.debug === true) {
        console.log(
          `SASL: password OK for user ${data
            .toString()
            .split("user=")[1]
            .trim()}`
        );
      }
      client.end();
      client.destroy();
      callback();
    } else if (data.toString().indexOf("FAIL") === 0) {
      if (params.debug === true) {
        console.log(
          `SASL: password FAIL for user ${data
            .toString()
            .split("user=")[1]
            .trim()}`
        );
      }
      client.end();
      client.destroy();
      callback("Wrong credentials");
    }
  });

  client.on("close", function () {
    if (params.debug === true) {
      console.log(`SASL connection closed`);
    }
  });
};
