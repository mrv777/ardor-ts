# ardor-ts

An [Ardor](https://ardorplatform.org) client library written in [TypeScript](https://www.typescriptlang.org).

Forked from [blobaa](https://github.com/blobaa/ardor-ts) to add new functionality.



## Installation

This library is published on GitHub's and npmjs's npm registry.


### Npmjs Registry

````
npm install @blobaa/ardor-ts
````

See [npmjs package](https://www.npmjs.com/package/@blobaa/ardor-ts).


### Github Registry

For using GitHub's registry, create a *.npmrc* file in the same directory as your *package.json* and add the following line 

````
@blobaa:registry=https://npm.pkg.github.com/blobaa
```` 

This tells npm to use the GitHub registry for @blobaa scoped packages. More information about multiple registry usage can be found in [this medium post](https://medium.com/@crysfel/using-different-registries-in-yarn-and-npm-766541d6f851).

You can now install the package via

````
npm install @blobaa/ardor-ts
````

See [GitHub package](https://github.com/blobaa/ardor-ts/packages/129759).

CAUTION: You need to [authenticate yourself](https://github.community/t5/GitHub-API-Development-and/Download-from-Github-Package-Registry-without-authentication/td-p/35255) to use the GitHub registry, even if it's a public available package.


## Development

You need to have [Node.js](https://nodejs.org/en/) installed.

To **initialize** the project just clone this repository and run
```
npm install
```

For **linting** run 
```
npm run lint
```

You can try to **autofix lint errors** with
```
npm run fix-lint
```

For **unit testing** run the following associated commands

browser:
```
npm run test-browser
```

node: 
```
npm run test-node
```

both: 
```
npm test
```


Because broadcasting a transaction costs fees, the transaction post request tests are disabled by default. You can enable them in the `test/config.ts` file.


## APIs

The library consist of the following modules:


### Request

This module creates requests to communicate with an ardor node. It handles get requests and transaction post requests. Every request which involves a transaction creation is signed locally so that your passphrase is never transmitted to an ardor node. 

Each function has the following singature:
````
functionName(url: string, params: FunctionNameParams): Promise<FunctionNameResponse>
````
The *functionName* corresponds to the ardor API request type, the *functionName*Params interface to the request parameters and the *functionName*Response interface to the JSON response properties (see [API console](https://testardor.jelurida.com/test)).

An example request to get the current account balance might look like this:


````typescript
import { request, GetBalanceParams, ChainId, ErrorResponse } from '@blobaa/ardor-ts'


const exampleRequest = async () => {
    
    /* set request parameters */
    const params: GetBalanceParams = {
        chain: ChainId.IGNIS,
        account: "ARDOR-XCTG-FVBM-9KNX-3DA6B"
    }

    try {

        /* create and emit a request */
        const response = await request.getBalance("https://testardor.jelurida.com", params);

        /* the response implements the GetBalanceResponse interface */
        console.log(response.balanceNQT);
        console.log(response.unconfirmedBalanceNQT);
        console.log(response.requestProcessingTime);

    } catch(e) {

        /* check the error type */
        const error = e as ErrorResponse;
        if(error.errorCode) {

            /* error is an api error */
            console.log(error.errorDescription);
            console.log(error.errorCode);

        } else {

            /* error is an axios error */
            console.log(e);

        }
    }
}

exampleRequest();
````

The following requests are implemented:

#### get requests

````typescript
- decodeToken(url: string, params: DecodeTokenParams): Promise<DecodeTokenResponse>
- getAccountProperties(url: string, params: GetAccountPropertiesParams): Promise<GetAccountPropertiesResponse>
- getBalance(url: string, params: GetBalanceParams): Promise<GetBalanceResponse>
- getBlockchainTransactions(url: string, params: GetBlockchainTransactionsParams): Promise<GetBlockchainTransactionsResponse>
- getBundlerRates(url: string, params: GetBundlerRatesParams): Promise<GetBundlerRatesResponse>
- getTransaction(url: string, params: GetTransactionParams): Promise<GetTransactionResponse>
````

#### transaction post requests

````typescript
- broadcastTransaction(url: string, params: BroadcastTransactionParams): Promise<BroadcastTransactionResponse>
- deleteAccountProperty(url: string, params: DeleteAccountPropertyParams): Promise<DeleteAccountPropertyResponse>
- sendMessage(url: string, params: SendMessageParams): Promise<SendMessageResponse>
- sendMoney(url: string, params: SendMoneyParams): Promise<SendMoneyResponse>
- setAccountProperty(url: string, params: SetAccountPropertyParams): Promise<SetAccountPropertyResponse>
````

### Account

The Account module is a wrapper of a forked [version](https://github.com/Atzen2/ardorjs) of the [ardorjs](https://github.com/mrv777/ardorjs) package. It handles transaction signing, account conversions and token generation.

It provides the following APIs:

````typescript
- convertPassphraseToPublicKey(passphrase: string, toByteArray?: boolean): string | Array<number> // toByteArray defaults to false
- convertPublicKeyToAccountId(publicKey: string): string
- convertPublicKeyToAccountRs(publicKey: string): string
- convertPassphraseToAccountId(passphrase: string): string
- convertPassphraseToAccountRs(passphrase: string): string
- checkAccountRs(accountRs: string): boolean // ok => true, error => false
- generateToken(message: string, passphrase: string, forTestnet?: boolean): string // forTestnet defaults to false
- signTransactionBytes(unsignedTransactionBytesHex: string, passphrase: string): string
- verifyTransactionBytes(unsignedTransactionBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string): boolean
````


### Passphrase

This module provides passphrase generation. It uses the [bip39](https://github.com/bitcoinjs/bip39) package with the default english wordlist.

API:

````typescript
 - generate(): string
````


### Time

The Time module handles conversions between Ardor epoch timestamps and unix timestamps.

It provides the following APIs:

````typescript
- convertUnixToArdorTimestamp(timestampInMsec: number, isTestnetTimestamp?: boolean): number // isTestnetTimestamp defaults to false
- convertArdorToUnixTimestamp(timestamp: number, isTestnetTimestamp?: boolean): number // isTestnetTimestamp defaults to false
````


## Module Instantiation

Each module is pre instantiated and importable via the lower case module name. If you need the class definition of a module, import it via the upper case name. For example:

````typescript
import { passphrase, Passphrase } from '@blobaa/ardor-ts'


/* use the default instance */
const passphrase1 = passphrase.generate();
console.log(passphrase1);

/* use your own instance */
const myPassphrase = new Passphrase();
const passphrase2 = myPassphrase.generate();
console.log(passphrase2);
````

Enjoy :)
