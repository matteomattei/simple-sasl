# Description

Simple SASL is a nodejs module to check PLAIN authentication against a SASL server.
At the moment only PLAIN method is supported.

# Options

| Field    | Type    | Default        | Description                      |
| -------- | ------- | -------------- | -------------------------------- |
| host     | string  | mandatory      | SASL server host                 |
| port     | number  | mandatory      | SASL server port                 |
| user     | string  | mandatory      | Username we want to authenticate |
| password | string  | mandatory      | Password for authentication      |
| method   | string  | mandatory      | Only "plain" is accepted         |
| rip      | string  | remote address | Remote IP address                |
| lip      | string  | local address  | Local IP address                 |
| service  | string  | imap           | Type of service                  |
| secured  | boolean | false          | If the connection is secured     |
| nologin  | boolean | false          | If we do not perform login       |
| debug    | boolean | false          | Print debug information          |

# Install

```
npm install simple-sasl
```

# Usage

```
const sasl = require("simple-sasl");

sasl.authenticate(
  {
    host: "xxx.xxx.xxx.xxx",
    port: 12345,
    user: "myname@domain.com",
    password: "MyPassword",
    rip: "xxx.xxx.xxx.xxx",
    service: smtp,
    nologin: true,
    secured: true,
    method: "plain",
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("OK, authenticated!");
    }
  }
);
```
