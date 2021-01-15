# fastify-method-override-wrapper

[![github action status](https://github.com/corsicanec82/fastify-method-override-wrapper/workflows/Node%20CI/badge.svg)](https://github.com/corsicanec82/fastify-method-override-wrapper/actions)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/42d88e5305a2463ebacf8acc93c643c6)](https://www.codacy.com/gh/corsicanec82/fastify-method-override-wrapper/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=corsicanec82/fastify-method-override-wrapper&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/corsicanec82/fastify-method-override-wrapper/branch/main/graph/badge.svg?token=PO0FKHV8ZO)](https://codecov.io/gh/corsicanec82/fastify-method-override-wrapper)
[![npm version](https://badge.fury.io/js/fastify-method-override-wrapper.svg)](https://badge.fury.io/js/fastify-method-override-wrapper)

[Fastify](http://fastify.io/) wrapper, which allows use HTTP verbs, such as DELETE, PATCH, HEAD, PUT, OPTIONS in case the client doesn't support them. Supports Fastify versions `>=2.0.0`.

## Install

```sh
npm install fastify-method-override-wrapper
```

## Usage

``` javascript
import fastify from 'fastify';
import wrapFastify from 'fastify-method-override-wrapper';

const wrappedFastify = wrapFastify(fastify);
const app = wrappedFastify({
  // any fastify options, for example logger
  logger: true,
});
```

To override the HTTP method, use the HTML form with the hidden _method field and the value of the target method:

```html
<form method="POST" action="/url/?_method=DELETE">
  <button type="submit">Submit</button>
</form>
```
