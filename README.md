# Domain verification

This is a simple script to validate domain ownership by using a
verification code in either a DNS TXT record or a HTTP GET request to a file.

## How to build

```bash
npm install
npm run build
```

## How to use

```bash
node domain-verify.js <dns|http> <url> <value>
```

Example using DNS:

```bash
node dist/bin/domain-verify.js dns example.com asdf1234
```

Example using HTTP:

```bash
node dist/bin/domain-verify.js http https://example.com/code.html asdf1234
```

## License

Licensed under the [MIT](LICENSE) License.
